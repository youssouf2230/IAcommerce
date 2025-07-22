package net.youssouf.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic fields
    private String name;
    private double purchasePrice;
    private double sellPrice;
    private int stockQuantity;
    private String description;
    private double oldPrice = 0.0;

    // AI-related fields
    private int numberOfView = 0;
    private double rating = 0.0;
    private int numberOfComments = 0;
    private int numberOfLiked = 0;
    private boolean hasLiked = false;
    private int numberOfDisliked = 0;

    // Easy sorting of products by novelty
    private LocalDate date = LocalDate.now();

    // relations fields
    // Each product belongs to a single category, while a category can contain multiple products.
    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ProductColor> colors;

}
