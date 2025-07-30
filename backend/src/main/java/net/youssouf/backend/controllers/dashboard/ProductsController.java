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
                pageable = PageRequest.of(page, size);
        }

        if (!search.isEmpty()) {
            return productRepository.findByNameContainingIgnoreCase(search, pageable);
        }

        return productRepository.findAll(pageable);
    }


    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        //System.out.println("product : " + product);
        return productService.createProduct(product);
    }

}
