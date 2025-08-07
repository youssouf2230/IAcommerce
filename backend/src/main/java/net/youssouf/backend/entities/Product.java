package net.youssouf.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
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

    @ElementCollection
    @CollectionTable(name = "product_colors", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "color")
    private List<String> colors = new ArrayList<>(List.of("black", "white"));

    @ElementCollection
    @CollectionTable(name = "product_tags", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "product_features", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "feature")
    private List<String> features = new ArrayList<>();

    private String brand;
    private String material;
    private String weight;       // ex: "200g"
    private String dimensions;   // ex: "15 x 10 x 3 cm"
    private String warranty;     // ex: "1-year limited hardware warranty."
    private String deliveryInfo; // ex: "Free delivery in 3-5 business days."
    private String returnPolicy; // ex: "30-day return policy."
    private String sku;

    private LocalDate date = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;
}