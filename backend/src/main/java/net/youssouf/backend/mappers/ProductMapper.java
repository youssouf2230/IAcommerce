package net.youssouf.backend.mappers;

import net.youssouf.backend.dtos.ProductDTO;
import net.youssouf.backend.entities.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductDTO toDto(Product product) {
        if (product == null) return null;

        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPurchasePrice(product.getPurchasePrice());
        dto.setSellPrice(product.getSellPrice());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setDescription(product.getDescription());
        dto.setOldPrice(product.getOldPrice());
        dto.setNumberOfView(product.getNumberOfView());
        dto.setRating(product.getRating());
        dto.setNumberOfComments(product.getNumberOfComments());
        dto.setNumberOfLiked(product.getNumberOfLiked());
        dto.setHasLiked(product.isHasLiked());
        dto.setNumberOfDisliked(product.getNumberOfDisliked());
        dto.setImageUrls(product.getImageUrls());

        if (product.getCategory() != null) {
            dto.setCategoryName(product.getCategory().getName());
        }

        return dto;
    }
}
