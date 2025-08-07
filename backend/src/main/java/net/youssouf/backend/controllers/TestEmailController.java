package net.youssouf.backend.controllers;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TestEmailController {
    private final ChatClient chatClient;

    public TestEmailController(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }

    @GetMapping("/api/test-llm")
    public ResponseEntity<String> testLlm() {
        try {
            String response = chatClient
                    .prompt()
                    .user("Bonjour, peux-tu me répondre ?")
                    .call()
                    .content();

            System.out.println("Réponse LLM : " + response);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur LLM : " + e.getMessage());
        }
    }
}

