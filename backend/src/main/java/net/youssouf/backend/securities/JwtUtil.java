package net.youssouf.backend.securities;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import net.youssouf.backend.entities.AppUser;
import net.youssouf.backend.entities.Role;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static io.jsonwebtoken.Jwts.*;

@Service
public class JwtUtil {

    private static final String SECRET_STRING = "CvgR4Tx9eM6zXfLtQ1KjWd83vLzP9nZpBq7Ru6HsNtLkAa2D3MjRf8UwXeYcVpZn";

    // Clé sous forme SecretKey avec décodage base64 (si ta clé est en base64)
    private static final SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_STRING));

    public static String generateToken(AppUser user) {
        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return builder()
                .subject(user.getEmail())
                .claim("roles", roleNames)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 12 * 60 * 60 * 1000))
                .signWith(key)
                .compact();
    }

    // Extraction email (sub) depuis token validé
    public static String extractEmail(String token) {
        Jwt<JwsHeader, Claims> jwt = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);

        return jwt.getPayload().getSubject();
    }

    // Validation simple (lance une exception si invalide)
    public static void validateToken(String token) throws JwtException {
        Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);
    }

    // Vérifie expiration
    public static boolean isTokenExpired(String token) {
        Jwt<JwsHeader, Claims> jwt = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);

        Date expiration = jwt.getPayload().getExpiration();
        return expiration.before(new Date());
    }
}
