package com.system.cms.service;

import com.system.cms.dto.LoginRequestDTO;
import com.system.cms.dto.LoginResponseDTO;
import com.system.cms.entity.User;
import com.system.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean passwordMatch = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        System.out.println("Password match: " + passwordMatch);

        if (!passwordMatch) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user);
    }
}