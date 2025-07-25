package net.youssouf.backend.dtos;

import lombok.Data;

@Data
public class CommentRequestDto {

        private String content;
        private String authorName;
        private Long userId;
        private Long productId; 
    }
