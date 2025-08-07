package net.youssouf.backend.repositories;

import net.youssouf.backend.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);

    Optional<AppUser> findByEmail(String email);

    Optional<AppUser> findByEmailAndPassword(String email, String password);

      @Query("""
        SELECT u FROM AppUser u 
        JOIN u.roles r 
        WHERE r.name = :roleName 
        AND SIZE(u.roles) = 1
    """)
    List<AppUser> findByRoleName(@Param("roleName") String roleName);

    AppUser findById(long id);
}
