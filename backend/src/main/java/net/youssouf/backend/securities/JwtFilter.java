//package net.youssouf.backend.securities;
//
//import io.jsonwebtoken.io.IOException;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//@Component
//public class JwtFilter extends OncePerRequestFilter {
//
//    private final UserService userService;
//
//    @Autowired
//    public JwtFilter(UserService userService) {
//        this.userService = userService;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain) throws ServletException, IOException {
//        String token = null;
//
//        String authHeader = request.getHeader("Authorization");
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            token = authHeader.substring(7);
//        }
//
//        if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            try {
//                JwtUtil.validateToken(token); // <- tu réutilises ta classe existante
//                String email = JwtUtil.extractEmail(token);
//
//                var userDetails = userService.loadUserByUsername(email);
//
//                var authToken = new UsernamePasswordAuthenticationToken(
//                        userDetails, null, userDetails.getAuthorities()
//                );
//                SecurityContextHolder.getContext().setAuthentication(authToken);
//
//            } catch (Exception e) {
//                System.out.println("Token invalide : " + e.getMessage());
//            }
//        }
//
//        filterChain.doFilter(request, response);
//    }
//}
