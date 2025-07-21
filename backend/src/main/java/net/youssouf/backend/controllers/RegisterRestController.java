package net.youssouf.backend.controllers;

import net.youssouf.backend.dtos.RegisterRequest;
import net.youssouf.backend.entities.AppUser;
import net.youssouf.backend.entities.Role;
import net.youssouf.backend.repositories.AppUserRepository;
import net.youssouf.backend.repositories.RoleRepository;
import net.youssouf.backend.securities.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class RegisterRestController {

    @Autowired
    private AppUserRepository userRepo;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email déjà utilisé");
        }

        AppUser user = new AppUser();
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        Role defaultRole = roleRepo.findByName("ROLE_CLIENT")
                .orElseThrow(() -> new RuntimeException("Role  no found"));
        user.getRoles().add(defaultRole);

        userRepo.save(user);
        return ResponseEntity.ok("Inscription valid ");
    }

}
