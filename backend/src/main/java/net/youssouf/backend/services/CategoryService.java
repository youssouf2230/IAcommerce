package net.youssouf.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import net.youssouf.backend.entities.Category;
import net.youssouf.backend.repositories.CategoryRepository;

@Service
public class CategoryService {
    
     @Autowired
     private CategoryRepository categoryRepository;
     public Category save(Category category) {
        return categoryRepository.save(category);
    }
public Category update(Long id, Category category) {
    Category existingCategory = categoryRepository.findById(id).orElse(null);
    if (existingCategory != null) {

        if (category.getName() != null && !category.getName().isBlank()) {
            existingCategory.setName(category.getName());
        }

        if (category.getUrlImage() != null && !category.getUrlImage().isBlank() ) {
            existingCategory.setUrlImage(category.getUrlImage());
        }

        return categoryRepository.save(existingCategory);
    }
    return null;
}

}
