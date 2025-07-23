package net.youssouf.backend.search_intelligent;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meilisearch.sdk.Client;
import com.meilisearch.sdk.Config;
import com.meilisearch.sdk.Index;
import lombok.RequiredArgsConstructor;
import net.youssouf.backend.entities.Product;
import net.youssouf.backend.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductIndexer {

    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Client meiliClient = new Client(
            new Config("http://localhost:7700", "masterKey")
    );

    public void indexAllProducts() throws Exception {
        List<Product> products = productRepository.findAll();

        List<ProductDocument> docs = products.stream().map(product -> ProductDocument.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .category(product.getCategory() != null ? product.getCategory().getName() : "")
                .sellPrice(product.getSellPrice())
                .oldPrice(product.getOldPrice())
                .rating(product.getRating())
                .imageUrl(
                        product.getImageUrls() != null && !product.getImageUrls().isEmpty()
                                ? product.getImageUrls().get(0)
                                : "/default.png"
                )
                .build()
        ).collect(Collectors.toList());

        Index index = meiliClient.index("products");

        // Convertir en JSON String
        String json = objectMapper.writeValueAsString(docs);

        // Ajouter les documents en JSON
        index.addDocuments(json);
    }
}
