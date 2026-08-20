package com.system.cms.dto;

import com.system.cms.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private Long id;
    private String token;
    private String name;
    private String email;
    private String phone;
    private String role;

    // constructor
    public LoginResponseDTO(String token, String name, String email, String phone, Role role , Long id) {
        this.id = id;
        this.token = token;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role.toString();
    }
}