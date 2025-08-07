package net.youssouf.backend.controllers.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody; 

import net.youssouf.backend.entities.Product;
import net.youssouf.backend.mappers.ProductMapper;
import net.youssouf.backend.repositories.ProductRepository;
import net.youssouf.backend.services.ProductService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard/products")
@CrossOrigin(origins = "*")
public class ProductsController {
    
   @Autowired
    private final ProductService productService;
    @Autowired
    private final ProductMapper productMapper;
    // automatic injection
    @Autowired
    private ProductRepository productRepository;

    public ProductsController(ProductService productService, ProductMapper productMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
    }

    @GetMapping
    public Page<Product> getAllProducts(@RequestParam(defaultValue = "") String search,@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "24") int size,@RequestParam(defaultValue = "") String sort
    ) {
        Pageable pageable;

        switch (sort) {
            case "priceLowHigh":
                pageable = PageRequest.of(page, size, Sort.by("sellPrice").ascending());
                break;
            case "priceHighLow":
                pageable = PageRequest.of(page, size, Sort.by("sellPrice").descending());
                break;
            case "rating":
                pageable = PageRequest.of(page, size, Sort.by("rating").descending());
                break;
            default:
                pageable = PageRequest.of(page, size, Sort.by("date"));
        }

        if (!search.isEmpty()) {
            return productRepository.findByNameContainingIgnoreCase(search, pageable);
        }

        return productRepository.findAll(pageable);
    }


    /*@PostMapping
    public Product createProduct(@RequestBody Product product) {
        //System.out.println("product : " + product);
        return productService.createProduct(product);
    }*/

@PostMapping
public ResponseEntity<?> createProduct(@RequestBody Product product) {
    try {
        System.out.println("Produit reçu depuis frontend : " + product);

        if (product.getName() == null || product.getName().trim().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(" Le champ 'name' est requis.");
        }

        // Appel au service pour générer les champs manquants via LLM
        Map<String, Object> generatedFields = productService.generateFromName(product.getName());
        System.out.println("Champs générés : " + generatedFields);

        // Appliquer les champs générés (avec vérification préalable)
        if (generatedFields != null) {
            product.setBrand((String) generatedFields.getOrDefault("brand", ""));
            product.setMaterial((String) generatedFields.getOrDefault("material", ""));
            product.setDimensions((String) generatedFields.getOrDefault("dimensions", ""));
            product.setWeight((String) generatedFields.getOrDefault("weight", ""));
            product.setWarranty((String) generatedFields.getOrDefault("warranty", ""));
            product.setSku((String) generatedFields.getOrDefault("sku", ""));
            product.setDeliveryInfo((String) generatedFields.getOrDefault("delivery", ""));
            product.setReturnPolicy((String) generatedFields.getOrDefault("returns", ""));

            Object tagsRaw = generatedFields.get("tags");
            if (tagsRaw instanceof List<?> tagList) {
                List<String> stringTags = tagList.stream()
                        .map(Object::toString)
                        .toList();
                product.setTags(stringTags);
                System.out.println("Tags générés : " + stringTags);
            } else {
                System.out.println("Aucun tags valides générés !");
            }
        }

        // Enregistrement en base
        Product saved = productService.createProduct(product);
        System.out.println("Produit enregistré : " + saved);

        return ResponseEntity.ok(saved);

    } catch (Exception e) {
        // 🔍 Log complet de l'erreur
        System.err.println("❌ Erreur lors de la création du produit : " + e.getMessage());
        e.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erreur interne : " + e.getMessage());
    }
}

}
