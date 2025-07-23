package net.youssouf.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private double purchasePrice;
    private double sellPrice;
    private int stockQuantity;
    private String description;
    private double oldPrice;
    private int numberOfView;
    private double rating;
    private int numberOfComments;
    private int numberOfLiked;
    private boolean hasLiked;
    private int numberOfDisliked;
    private List<String> imageUrls;
    private String categoryName;
}
