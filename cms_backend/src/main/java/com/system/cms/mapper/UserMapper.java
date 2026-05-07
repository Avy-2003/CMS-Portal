package com.system.cms.mapper;

import com.system.cms.dto.UserDTO;
import com.system.cms.entity.User;
import com.system.cms.util.Role;



public class UserMapper {

    public static User toEntity(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(dto.getPassword());
        user.setRole(Role.valueOf(dto.getRole()));
        return user;
    }

    public static UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole().name());
        return dto;
    }
}
