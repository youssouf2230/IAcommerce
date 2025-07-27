package net.youssouf.backend.dtos;

import lombok.Data;

@Data
public class AddToCartRequest {
    private Long productId;
    private int quantity;
    private String sessionId;
}