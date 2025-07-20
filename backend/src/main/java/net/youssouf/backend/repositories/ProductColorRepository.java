package net.youssouf.backend.repositories;

import net.youssouf.backend.entities.ProductColor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductColorRepository extends JpaRepository<ProductColor, Long> {
}
