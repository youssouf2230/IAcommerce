package net.youssouf.backend.controllers.dashboard;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.youssouf.backend.dtos.ProductGenerationRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductGenerationController {

    private final ChatClient chatClient;
    public ProductGenerationController(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }
    @PostMapping("/generate")
    public Map<String, Object> generateProduct(@RequestBody ProductGenerationRequest request) {
        return generateFromName(request.getName());
    }

    // Nouveau GET
    @GetMapping("/generate")
    public Map<String, Object> generateProductGet(@RequestParam String name) {
        return generateFromName(name);
    }

    // Méthode commune pour générer via LLM
    private Map<String, Object> generateFromName(String name) {
        String prompt = """
            Tu es un assistant expert en e-commerce. 
            Génère une description détaillée ainsi que les attributs suivants à partir uniquement du nom du produit :
            - description
            - marque (brand)
            - matière (material)
            - dimensions (en cm)
            - poids (en g)
            - garantie de 3 mois
            - SKU (crée un SKU logique)
            - tags (liste de mots clés)
            - délai de livraison (delivery)
            - politique de retour (returns)
            
            Donne le résultat sous forme d'un objet JSON.
            
            Nom du produit : %s
        """.formatted(name);

        try {
            String response = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(response, new TypeReference<>() {});
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération du produit : " + e.getMessage(), e);
        }
    }
}
