package net.youssouf.backend.services;

import lombok.RequiredArgsConstructor;
import net.youssouf.backend.entities.Cart;
import net.youssouf.backend.entities.CartItem;
import net.youssouf.backend.repositories.CartRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CartReminderService {

    private final CartRepository cartRepository;
    private final EmailService emailService;
    private final ChatClient chatClient;

    public CartReminderService(CartRepository cartRepository, EmailService emailService, ChatClient.Builder chatClientBuilder) {
        this.cartRepository = cartRepository;
        this.emailService = emailService;
        this.chatClient = chatClientBuilder.build();
    }

    // Tous les jous à 10h
    @Scheduled(cron = "0 0 10 * * ?")
    //@Scheduled(cron = "0 */2 * * * ?") // Toutes les 2
    public void sendCartReminders() {
        LocalDateTime twentyFourHoursAgo = LocalDateTime.now().minusHours(24);
        List<Cart> abandonedCarts = cartRepository.findByLastUpdatedBeforeAndAbandonedFalse(twentyFourHoursAgo);

        for (Cart cart : abandonedCarts) {
            if (cart.getUser() == null || cart.getUser().getEmail() == null) continue;

            String recipientEmail = cart.getUser().getEmail();
            String sessionId = cart.getSessionId();
            String link = "http://localhost:3000/test-panier?sessionId=" + sessionId;

            try {
                //  Générer le prompt avec les produits
                String prompt = buildPrompt(cart, link);

                String message = chatClient.prompt()
                        .system("""
                            Tu es un assistant IA de marketing. Ton rôle est de générer un email de relance vendeur et personnalisé
                            à propos d'un panier abandonné dans une boutique en ligne. Sois engageant et utilise un ton chaleureux.
                            """)
                        .user(prompt)
                        .call()
                        .content();

                String subject = "🛒 Votre panier vous attend chez IAcommerce !";

                emailService.sendEmail(recipientEmail, subject, message);

                cart.setAbandoned(true);
                cartRepository.save(cart);

                System.out.println(" Email IA envoyé à " + recipientEmail);

            } catch (Exception e) {
                System.err.println(" Erreur IA pour cart id=" + cart.getId() + ": " + e.getMessage());
            }
        }
    }

    private String buildPrompt(Cart cart, String link) {
        StringBuilder builder = new StringBuilder();

        String boutiqueName = "IAcommerce";
        String contactEmail = "iacommerce9@gmail.com";
        String equipeName = "Équipe IAcommerce";
        String prenomUser = cart.getUser() != null ? cart.getUser().getUsername() : "Cher(e) client(e)";

        builder.append("Tu es un assistant IA chargé de rédiger un email de relance pour un panier abandonné dans une boutique en ligne.\n");
        builder.append("La boutique s'appelle ").append(boutiqueName).append(".\n");
        builder.append("L'adresse de contact est ").append(contactEmail).append(".\n");
        builder.append("Le prénom du client est ").append(prenomUser).append(".\n");
        builder.append("L'équipe qui signe est '").append(equipeName).append("'.\n\n");

        builder.append("Le client a laissé ces articles dans son panier :\n");
        double total = 0.0;
        for (CartItem item : cart.getItems()) {
            builder.append("- ").append(item.getProduct().getName())
                    .append(" x").append(item.getQuantity()).append("\n");
            total += item.getQuantity() * item.getProduct().getSellPrice();
        }

        builder.append("\nMontant total estimé : ").append(String.format("%.2f €", total)).append("\n");
        builder.append("Lien pour finaliser l'achat : ").append(link).append("\n\n");

        builder.append("""
        Rédige un email chaleureux, engageant et personnalisé avec les points suivants :
        - Objet : 🛍 Votre panier vous attend avec une surprise ! 
        - Salutation personnalisée avec le prénom du client + emoji
        - Mentionner que les articles sont toujours disponibles + emoji
        - Invitation à finaliser votre achat (pas 'mon achat') + emoji
        - Offrir un avantage (ex : livraison gratuite) +  des emoji
        - Proposer l’aide en cas de besoin, avec le mail de contact
        - Remercier et encourager à revenir +  des emoji
        - Signature avec le nom de l'équipe + des emoji

        Structure l’email proprement et sans balises HTML, en format texte simple.
        """);

        return builder.toString();
    }

}
