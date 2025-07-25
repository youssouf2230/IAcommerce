package net.youssouf.backend.repositories;

import net.youssouf.backend.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional <AppUser >findByUsername(String username);
    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findByEmailAndPassword(String email, String password);


    AppUser findById(long id);
}
