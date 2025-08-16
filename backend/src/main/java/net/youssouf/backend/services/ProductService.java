package net.youssouf.backend.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import net.youssouf.backend.entities.Product;
import net.youssouf.backend.repositories.ProductRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Data
public class ProductService {

    private final ProductRepository productRepository;
    private final ChatClient chatClient;

    public ProductService(ProductRepository productRepository, ChatClient.Builder chatClientBuilder) {
        this.productRepository = productRepository;
        this.chatClient = chatClientBuilder.build();
        System.out.println(">>> ChatClient injected successfully");
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getProductSimilar(Long categoryId, Long excludedProductId) {
        return productRepository.findByCategoryIdAndIdNot(categoryId, excludedProductId);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public void incrementViewCount(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("No found"));
        product.setNumberOfView(product.getNumberOfView() + 1);
        productRepository.save(product);
    }

    public Map<String, Object> generateFromName(String name) {
        String prompt = """
            Tu es un assistant e-commerce. Génère strictement un objet JSON valide, sans explication, ni texte, ni retour à la ligne avant ou après.

            Réponds uniquement avec un JSON comme ceci :
            {
              "description": "...",
              "brand": "...",
              "material": "...",
              "dimensions": "...",
              "weight": "...",
              "warranty": "...",
              "sku": "...",
              "tags": ["...", "..."],
              "features": ["...", "..."],
              "delivery": "...",
              "returns": "..."
            }

            Nom du produit : %s
        """.formatted(name);

        try {
            String response = chatClient
                    .prompt()
                    .user(prompt)
                    .call()
                    .content();

            String cleaned = sanitizeJson(response);
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(cleaned, new TypeReference<>() {});
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération du produit : " + e.getMessage(), e);
        }
    }

    /**
     * Nettoie le contenu JSON pour enlever les délimiteurs Markdown (```json ... ```)
     */
    private String sanitizeJson(String raw) {
        if (raw == null) return "";
        // Supprime les ``` ou ```json au début/fin
        return raw
                .replaceAll("(?i)^```json\\s*", "")  // en début
                .replaceAll("(?i)^```\\s*", "")      // cas sans json
                .replaceAll("\\s*```$", "")          // en fin
                .trim();
    }
}
