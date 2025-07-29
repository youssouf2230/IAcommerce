package net.youssouf.backend.controllers;


import lombok.RequiredArgsConstructor;
import net.youssouf.backend.dtos.OrderRequestDTO;
import net.youssouf.backend.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderRestController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequestDTO request) {
        try {
            orderService.placeOrder(request);
            return ResponseEntity.ok("Commande passée avec succès !");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }
}
