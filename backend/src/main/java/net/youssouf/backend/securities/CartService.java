package net.youssouf.backend.securities;

import lombok.RequiredArgsConstructor;
import net.youssouf.backend.entities.AppUser;
import net.youssouf.backend.entities.Cart;
import net.youssouf.backend.entities.CartItem;
import net.youssouf.backend.entities.Product;
import net.youssouf.backend.repositories.CartItemRepository;
import net.youssouf.backend.repositories.CartRepository;
import net.youssouf.backend.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    public Cart addProductToCart(AppUser user, String sessionId, Long productId, int quantity) {
        Cart cart;
        if (user != null) {
            cart = cartRepository.findFirstByUser_Id(user.getId()).stream().findFirst()
                    .orElseGet(() -> new Cart(null, user, null, false, LocalDateTime.now(), new ArrayList<>()));
        } else if (sessionId != null) {
            cart = cartRepository.findFirstBySessionId(sessionId).stream().findFirst()
                    .orElseGet(() -> new Cart(null, null, sessionId, false, LocalDateTime.now(), new ArrayList<>()));
        } else {
            throw new IllegalArgumentException("anything user and session id ");
        }

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product no found"));

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem(null, cart, product, quantity);
            cart.getItems().add(newItem);
        }

        return cartRepository.save(cart);
    }
    public void removeItem(Long itemId) {
        cartItemRepository.deleteById(itemId);
    }

    public void updateItemQuantity(Long itemId, int quantity) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        item.setQuantity(quantity);
        cartItemRepository.save(item);
    }


}
