package com.system.cms.service;

import com.system.cms.dto.LoginRequestDTO;
import com.system.cms.dto.LoginResponseDTO;

public interface AuthService {
    LoginResponseDTO login(LoginRequestDTO request);
}
