
package net.youssouf.backend.controllers;

import net.youssouf.backend.dtos.CommentRequestDto;
import net.youssouf.backend.entities.AppUser;
import net.youssouf.backend.entities.Comment;
import net.youssouf.backend.entities.Product;
import net.youssouf.backend.repositories.AppUserRepository;   // <- à ajouter
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
    private AppUserRepository userRepository;  // <-- injecter repository, pas AppUser

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
        comment.setRating(0); // ou une valeur par défaut

        // Récupérer produit
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        comment.setProduct(product);

        // Récupérer user si userId != null
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

        // Appel LLM
        String response = chatClient.prompt()
                .system(systemMessage)
                .user(content)
                .call()
                .content();

        return extractRating(response);
    }

    private int extractRating(String response) {
        response = response.trim();
        char lastValidDigit = 0;

        for (char c : response.toCharArray()) {
            if (c >= '1' && c <= '5') {
                lastValidDigit = c;
            }
        }

        if (lastValidDigit != 0) {
            return Character.getNumericValue(lastValidDigit);
        } else {
            throw new IllegalArgumentException("Réponse LLM invalide : " + response);
        }
    }
}

