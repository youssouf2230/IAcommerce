package net.youssouf.backend.repositories;

import net.youssouf.backend.entities.Comment;
import net.youssouf.backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByProductIdOrderByCreatedAtDesc(Long productId);

    List<Comment> findByProductId(Long productId);
    List<Comment> findByProduct(Product product);

}
