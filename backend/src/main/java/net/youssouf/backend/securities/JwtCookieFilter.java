package net.youssouf.backend.securities;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.youssouf.backend.entities.AppUser;
import net.youssouf.backend.repositories.AppUserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtCookieFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final AppUserRepository appUserRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // 1. Extraire le cookie 'token'
        String token = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        // 2. Si token présent et SecurityContext non authentifié
        if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                // Valider token
                JwtUtil.validateToken(token);

                // Extraire email depuis token
                String email = JwtUtil.extractEmail(token);

                // Charger user depuis DB
                AppUser user = appUserRepository.findByEmail(email).orElse(null);

                if (user != null) {
                    // Convertir rôles en authorities Spring Security
                    List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                            .map(role -> new SimpleGrantedAuthority(role.getName()))
                            .collect(Collectors.toList());

                    // Créer Authentication
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(user, null, authorities);

                    // Placer dans SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }

            } catch (Exception e) {
                // Token invalide ou autre problème, on laisse passer sans auth
                logger.warn("Invalid JWT token from cookie: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}
