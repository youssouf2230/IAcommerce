package net.youssouf.backend.services;

import lombok.RequiredArgsConstructor;
import net.youssouf.backend.dtos.OrderRequestDTO;
import net.youssouf.backend.entities.*;
import net.youssouf.backend.repositories.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;

    public void placeOrder(OrderRequestDTO request) {
        //  Trouver le panier
        Cart cart = cartRepository.findById(request.getCartId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty.");
        }

        // Créer la commande
        Order order = new Order();
        order.setContactPhone(request.getContactPhone());
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setDeliveryInstructions(request.getDeliveryInstructions());
        order.setStatus(false);
        order.setDate(LocalDate.now());

        // Calculer le total
        double total = cart.getItems().stream()
                .mapToDouble(item -> item.getQuantity() * item.getProduct().getSellPrice())
                .sum();
        order.setTotal(total);

        // Associer utilisateur ou session
        AppUser user = cart.getUser();
        if (user != null) {
            order.setUser(user);
        } else if (request.getSessionId() != null && !request.getSessionId().isEmpty()) {
            order.setSessionId(request.getSessionId());
        }

        // Ajouter les items
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem item : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getProduct().getSellPrice());
            orderItems.add(orderItem);
        }

        order.setItems(orderItems);

        // Sauvegarder la commande (avec cascade sur OrderItem)
        orderRepository.save(order);

        // Vider le panier
        cart.getItems().clear();
        cartRepository.save(cart);

//        System.out.println("===================================================");
//        System.out.println("Commande enregistrée : ID = " + order.getId());
//        System.out.println("===================================================");
    }
}
