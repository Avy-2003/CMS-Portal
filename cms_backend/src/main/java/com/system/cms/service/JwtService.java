package com.system.cms.service;

import com.system.cms.dto.LoginResponseDTO;
import com.system.cms.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY =
            "my-super-secret-key-my-super-secret-key-12345";

    public LoginResponseDTO generateToken(User user) {

        String token = Jwts.builder()
                .subject(user.getEmail())
                .claim("role", user.getRole())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getKey())
                .compact();

        return new LoginResponseDTO(
                token,
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getId()
        );

    }

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );
    }
}