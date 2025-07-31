package net.youssouf.backend.controllers.dashboard;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.youssouf.backend.entities.Category;
import net.youssouf.backend.repositories.CategoryRepository;
import net.youssouf.backend.services.CategoryService;

@RestController
@RequestMapping("/api/dashboard/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping("")
    public Category createCategory(@RequestBody Category category) {

        return categoryService.save(category);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteCategory(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            categoryRepository.deleteById(id);
            response.put("success", true);
            response.put("message", "Category deleted successfully.");
            return ResponseEntity.ok(response);
        } catch (DataIntegrityViolationException e) {
            response.put("success", false);
            response.put("message", "Cannot delete category: it's referenced by other records.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An unexpected error occurred.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
