package com.system.cms.service;

import com.system.cms.dto.UserDTO;

import java.util.List;
import java.util.Map;

public interface UserService {

    UserDTO registerUser(UserDTO dto);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id);

    UserDTO updateUser(Long id, UserDTO dto);

    void deleteUser(Long id);

    List<Map<String, Object>> getOfficerStats();
}
