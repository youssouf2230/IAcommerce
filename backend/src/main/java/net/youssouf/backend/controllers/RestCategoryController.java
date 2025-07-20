package net.youssouf.backend.controllers;

import net.youssouf.backend.entities.Category;
import net.youssouf.backend.entities.Product;
import net.youssouf.backend.repositories.CategoryRepository;
import net.youssouf.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class RestCategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/with-image")
    public List<Map<String, Object>> getCategoriesWithImages() {
        List<Category> categories = categoryRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Category category : categories) {
            List<Product> products = productRepository.findByCategoryId(category.getId());

            // Préparer image
            String imageUrl = "";
            if (!products.isEmpty() && !products.get(0).getColors().isEmpty()) {
                imageUrl = products.get(0).getColors().get(0).getUrlImage();
            }

            // Construction du résultat
            Map<String, Object> map = new HashMap<>();
            map.put("id", category.getId());
            map.put("name", category.getName());
            map.put("imageUrl", imageUrl);

            response.add(map);
        }

        return response;
    }
}
