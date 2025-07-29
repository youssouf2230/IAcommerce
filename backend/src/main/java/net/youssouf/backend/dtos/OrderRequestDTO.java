package net.youssouf.backend.dtos;

import lombok.Data;

@Data

public class OrderRequestDTO {
    private Long cartId;
    private String contactPhone;
    private String deliveryAddress;
    private String deliveryInstructions;
    private String sessionId;
}
