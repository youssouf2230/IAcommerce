package net.youssouf.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor
@AllArgsConstructor
public class ProductColor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String color;
    private String urlImage;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore // Empêche la boucle infinie
    private Product product;
}
