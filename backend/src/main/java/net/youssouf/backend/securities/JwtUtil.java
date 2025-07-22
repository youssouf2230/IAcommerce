package net.youssouf.backend.securities;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import net.youssouf.backend.entities.AppUser;
import net.youssouf.backend.entities.Role;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtUtil {

    private static final String SECRET_STRING = "CvgR4Tx9eM6zXfLtQ1KjWd83vLzP9nZpBq7Ru6HsNtLkAa2D3MjRf8UwXeYcVpZn";
    private static final SecretKey key = Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));

    public static String generateToken(AppUser user) {
        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());
        
        // This is a more direct way to build the token.
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("roles", roleNames)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 12 * 60 * 60 * 1000))
                .signWith(key)
                .compact();
    }
}