package net.youssouf.backend.controllers;

import net.youssouf.backend.dtos.CommentRequestDto;
import net.youssouf.backend.entities.AppUser;
import net.youssouf.backend.entities.Comment;
import net.youssouf.backend.entities.Product;
import net.youssouf.backend.repositories.AppUserRepository;
import net.youssouf.backend.repositories.CommentRepository;
import net.youssouf.backend.repositories.ProductRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class AIAgentRestControllerAnalyseSentiment {

    private final ChatClient chatClient;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AppUserRepository userRepository;

    public AIAgentRestControllerAnalyseSentiment(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @GetMapping("/product/{productId}")
    public List<Comment> getCommentsByProduct(@PathVariable Long productId) {
        return commentRepository.findByProductId(productId);
    }

    @PostMapping
    public Comment createComment(@RequestBody CommentRequestDto dto) {
        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setAuthorName(dto.getAuthorName());

        // 🔍 Analyse du contenu via LLM
        int rating;
        try {
            rating = analyzeComment(dto.getContent());
        } catch (Exception e) {
            // Par défaut : note neutre
            rating = 3;
            System.err.println("Erreur lors de l'analyse du commentaire : " + e.getMessage());
        }
        comment.setRating(rating);

        // Produit
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        comment.setProduct(product);

        // Utilisateur (facultatif)
        if (dto.getUserId() != null) {
            AppUser user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
            comment.setUser(user);
        }

        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    public int analyzeComment(String content) {
        String systemMessage = """
                Vous êtes un agent qui analyse le contenu d'un commentaire
                et renvoie uniquement une note entière de 1 à 5 représentant le sentiment :
                1 = très négatif
                2 = négatif
                3 = neutre
                4 = positif
                5 = très positif
                Ne précédez pas la réponse de texte, ni d'introduction, ni de balises.
                Juste un chiffre : 1, 2, 3, 4 ou 5.
                """;

        String response = chatClient.prompt()
                .system(systemMessage)
                .user(content)
                .call()
                .content();

        return extractRating(response);
    }

    private int extractRating(String response) {
        response = response.trim();
        if (response.matches("[1-5]")) {
            return Integer.parseInt(response);
        }
        throw new IllegalArgumentException("Réponse LLM invalide : " + response);
    }
}