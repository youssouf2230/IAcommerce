package net.youssouf.backend.controllers.dashboard;

import java.util.List;
import java.util.Map;

import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.youssouf.backend.entities.Order;
import net.youssouf.backend.enums.OrderStatus;
import net.youssouf.backend.services.OrderService;

@RestController
@RequestMapping("/api/dashboard/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable Long orderId) {
        return orderService.findById(orderId);
    }

    @PutMapping("/{orderId}/status")
    public Order updateStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> payload) {
        OrderStatus status = OrderStatus.valueOf(payload.get("status").toUpperCase());
        return orderService.updateStatus(orderId, status);
    }

}
