package net.youssouf.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor @Builder
public class Cart {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private AppUser user; // nullable pour paniers anonymes

    private String sessionId; // pour utilisateur non connecté (stocké côté navigateur)
    private boolean abandoned;

    private LocalDateTime lastUpdated;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"cart"})
    private List<CartItem> items;

}

