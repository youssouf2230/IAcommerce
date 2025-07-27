package net.youssouf.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import net.youssouf.backend.services.EmailService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TestEmailController {

    private final EmailService emailService;

    @PostMapping("/api/test/send-email")
    public String sendTestEmail() {
        String to = "dy5155414@gmail.com";
        String subject = "Test Email IAcommerce";
        String body = "Ceci est un email de test envoyé depuis Spring Boot avec Gmail SMTP.";

        emailService.sendEmail(to, subject, body);

        return "Email envoyé à " + to;
    }

    @GetMapping("/api/test/send-email")
    public String sendTestEmailGet() {
        return sendTestEmail();  // appel de la méthode POST
    }
}

