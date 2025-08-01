package net.youssouf.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = {"orderItems"})
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contactPhone;

    @Column(length = 500)
    private String deliveryAddress;

    @Column(length = 300)
    private String deliveryInstructions;

    private boolean status;

    private double total;

    private LocalDate date;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> items;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private AppUser user;
    // for user anomyous
    private String sessionId;
}
