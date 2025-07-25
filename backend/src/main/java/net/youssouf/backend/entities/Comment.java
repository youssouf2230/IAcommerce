package net.youssouf.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @Min(1)
    @Max(5)
    private int rating;

    // Utilisation de LocalDateTime pour plus de précision temporal
    private LocalDateTime createdAt = LocalDateTime.now();

    // Nom auteur libre, utilisé si user est null (anonymize)
    private String authorName;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    // Relation optionnelle vers User (nullable = true)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    @JsonIgnore
    private AppUser user;
}
