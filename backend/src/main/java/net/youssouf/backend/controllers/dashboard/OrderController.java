package net.youssouf.backend.controllers.dashboard;

import lombok.RequiredArgsConstructor;
import net.youssouf.backend.entities.Order;
import net.youssouf.backend.repositories.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/dashboard/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderRepository orderRepository;

    @GetMapping
    public List<Order> getOrders() {
        // System.out.println("=======================================================");
       // System.out.println(orderRepository.findAll());
       // System.out.println("=======================================================");

        return orderRepository.findAll();
    }
    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
    }

}
