package net.youssouf.backend.search_intelligent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor
@AllArgsConstructor
public class ProductDocument {
    private Long id;
    private String name;
    private String description;
    private String category;
    private Double sellPrice;
    private Double oldPrice;
    private Double rating;
    private String imageUrl;
}