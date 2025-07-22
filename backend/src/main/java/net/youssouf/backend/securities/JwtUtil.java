package net.youssouf.backend.securities;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtUtil {

    private static final String SECRET = "CvgR4Tx9eM6zXfLtQ1KjWd83vLzP9nZpBq7Ru6HsNtLkAa2D3MjRf8UwXeYcVpZn";
    private static final SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET));

    public static String generateToken(String subject) {
        return Jwts.builder()
                .header().type("JWT").and()
                .claims().subject(subject).issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 12 * 60 * 60 * 1000)) // 12 heures
                .and()
                .signWith(key)
                .compact();
    }
}
