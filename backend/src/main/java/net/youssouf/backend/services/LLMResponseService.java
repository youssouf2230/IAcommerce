package net.youssouf.backend.services;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LLMResponseService {

    private final ChatClient chatClient;

    @Autowired
    private EmailService emailService;

    public LLMResponseService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String generateResponse(String from, String subject, String content) {
        String prompt = """
            Tu es l'assistant client IAcommerce, une boutique en ligne de produits électroniques.
        
            Ta mission est d’aider le client en répondant clairement et précisément à ses questions.
            Par exemple :
            - Pour passer une commande, dis-lui d'ajouter les produits au panier, puis finaliser via la page panier.
            - Pour un problème de livraison, invite-le à fournir son numéro de commande.
            - Pour toute autre demande, reste courtois et propose de contacter le support.
        
            Maintenant, réponds au message ci-dessous de manière professionnelle et utile :
        
            De : %s
            Sujet : %s
        
            Message :
            %s
        
            Réponds au client d'abord. Ensuite, indique seulement à la fin sur une ligne séparée :  
            IMPORTANT: OUI ou IMPORTANT: NON
        """.formatted(from, subject, content);

        return callLLM(prompt, from, subject, content);
    }

    private String callLLM(String prompt, String from, String subject, String content) {
        String fullResponse = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        // Vérifie si le message est important
        boolean isImportant = fullResponse.toUpperCase().matches("(?s).*IMPORTANT:\\s*OUI.*");

        // Nettoie le message avant de l'envoyer au client
        String cleanedResponse = fullResponse.replaceAll("(?s)IMPORTANT:.*", "").trim();

        if (isImportant) {
            sendAlertToOwner(from, subject, content);
        }

        return cleanedResponse;
    }

    private void sendAlertToOwner(String from, String subject, String content) {
        String alertSubject = "🚨 Message client important reçu : " + subject;
        String alertBody = """
        Un message prioritaire vient d'être reçu de : %s

        Sujet : %s

        Contenu :
        %s

        Merci de traiter cette requête dès que possible.

        📬 IAcommerce Support
        """.formatted(from, subject, content);

        emailService.sendEmail(
                "iacommerce9@gmail.com",
                alertSubject,
                alertBody
        );
    }
}
