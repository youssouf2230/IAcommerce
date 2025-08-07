package net.youssouf.backend.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import net.youssouf.backend.entities.Product;
import net.youssouf.backend.repositories.ProductRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
        Tu es un assistant expert en e-commerce. 
        Génère une description détaillée ainsi que les attributs suivants à partir uniquement du nom du produit :
        - description
        - marque (brand)
        - matière (material)
        - dimensions (en cm)
        - poids (en g)
        - garantie de 3 mois
        - SKU (crée un SKU logique)
        - tags (liste de mots clés)
        - features (liste des caractéristiques)
        - délai de livraison (delivery)
        - politique de retour (returns)
        Donne le résultat sous forme d'un objet JSON.
        Nom du produit : %s
    """.formatted(name);

        try {
            String response = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(response, new TypeReference<>() {});
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération du produit : " + e.getMessage(), e);
        }
    }

}
