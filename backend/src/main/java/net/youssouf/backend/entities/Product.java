package net.youssouf.backend.entities;

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

    private String name;
    private double purchasePrice;
    private double sellPrice;
    private int stockQuantity;
    private String description;
    private double oldPrice = 0.0;

    private int numberOfView = 0;
    private double rating = 0.0;
    private int numberOfComments = 0;
    private int numberOfLiked = 0;
    private boolean hasLiked = false;
    private int numberOfDisliked = 0;

    private LocalDate date = LocalDate.now();

    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;
}
