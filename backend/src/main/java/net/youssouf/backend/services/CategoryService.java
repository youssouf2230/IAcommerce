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

}
