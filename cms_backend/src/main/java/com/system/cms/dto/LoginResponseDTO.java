package com.system.cms.dto;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
}