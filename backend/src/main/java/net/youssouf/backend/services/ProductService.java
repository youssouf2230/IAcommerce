package net.youssouf.backend.services;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.youssouf.backend.entities.Product;
import net.youssouf.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
@AllArgsConstructor
@Builder
public class ProductService {

    @Autowired
    private final ProductRepository productRepository;

    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);

    }
    public List<Product> getProductSimilar(Long categoryId, Long excludedProductId) {
        return productRepository.findByCategoryIdAndIdNot(categoryId, excludedProductId);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // number of like
    public void incrementViewCount(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("No found"));

        product.setNumberOfView(product.getNumberOfView() + 1);
        productRepository.save(product);
    }


}
