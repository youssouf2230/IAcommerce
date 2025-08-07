package net.youssouf.backend.controllers.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Product createProduct(@RequestBody Product product) {
        System.out.println(" Réception produit depuis frontend : " + product);

        // Appel au LLM pour générer les champs manquants
        Map<String, Object> generatedFields = productService.generateFromName(product.getName());

        System.out.println(" Champs générés par LLM : " + generatedFields);

        // Compléter les champs avec ce que le LLM a généré
        product.setDescription((String) generatedFields.get("description"));
        product.setBrand((String) generatedFields.get("brand"));
        product.setMaterial((String) generatedFields.get("material"));
        product.setDimensions((String) generatedFields.get("dimensions"));
        product.setWeight((String) generatedFields.get("weight"));
        product.setWarranty((String) generatedFields.get("warranty"));
        product.setSku((String) generatedFields.get("sku"));
        product.setDeliveryInfo((String) generatedFields.get("delivery"));
        product.setReturnPolicy((String) generatedFields.get("returns"));

        // Tags : conversion vers List<String>
        if (generatedFields.get("tags") instanceof List<?> tagList) {
            List<String> stringTags = tagList.stream()
                    .map(Object::toString)
                    .toList();
            product.setTags(stringTags);
            System.out.println("🏷 Tags générés : " + stringTags);
        } else {
            System.out.println(" Aucun tags valides générés !");
        }

        Product saved = productService.createProduct(product);
        System.out.println(" Produit enregistré avec succès : " + saved);

        return saved;
    }

}
