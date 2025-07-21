package net.youssouf.backend.repositories;

import net.youssouf.backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // filter product trending
    @Query("SELECT p FROM Product p WHERE p.rating >= 4 AND p.numberOfView >= 100 AND p.numberOfLiked > p.numberOfDisliked ORDER BY p.rating DESC, p.numberOfView DESC")
    List<Product> findTrendingProducts();
    List<Product> findTop3ByOrderByDateDesc();
    List<Product> findByCategoryId(Long categoryId);
}