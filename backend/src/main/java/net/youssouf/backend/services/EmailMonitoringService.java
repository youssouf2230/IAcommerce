package net.youssouf.backend.services;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.search.FlagTerm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
@RequiredArgsConstructor
public class EmailMonitoringService {

    private final EmailService emailService;
    private final LLMResponseService llmResponseService;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    //@Scheduled(cron = "0 0 10 * * ?") // Chaque jour à 10h
   // @Scheduled(cron = "0 */2 * * * ?") // Toutes les 2
    public void checkInboxAndRespond() {
        try {
            Properties props = new Properties();
            props.setProperty("mail.store.protocol", "imaps");

            Session session = Session.getInstance(props);
            Store store = session.getStore();
            store.connect("imap.gmail.com", username, password);

            Folder inbox = store.getFolder("INBOX");
            inbox.open(Folder.READ_WRITE);

            Message[] messages = inbox.search(new FlagTerm(new Flags(Flags.Flag.SEEN), false));

            for (Message msg : messages) {
                String from = ((InternetAddress) msg.getFrom()[0]).getAddress();
                String subject = msg.getSubject();
                String content = msg.getContent().toString();

                String aiResponse = llmResponseService.generateResponse(from, subject, content);
                emailService.sendEmail(from, "Re: " + subject, aiResponse);
                msg.setFlag(Flags.Flag.SEEN, true);
            }

            inbox.close(false);
            store.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
