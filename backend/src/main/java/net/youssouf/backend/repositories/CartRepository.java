package net.youssouf.backend.repositories;


import net.youssouf.backend.entities.AppUser;
import net.youssouf.backend.entities.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Page<Cart> findByUser_Id(Long userId, Pageable pageable);
    Page<Cart> findBySessionId(String sessionId, Pageable pageable);
    Optional<Cart> findFirstByUser_Id(Long userId);
    Optional<Cart> findFirstBySessionId(String sessionId);
    @Query("""
    SELECT c FROM Cart c
    LEFT JOIN FETCH c.items
    WHERE c.lastUpdated < :dateTime AND c.abandoned = false
    """)
    List<Cart> findByLastUpdatedBeforeAndAbandonedFalse(@Param("dateTime") LocalDateTime dateTime);


}
