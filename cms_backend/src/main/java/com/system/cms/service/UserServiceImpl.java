package com.system.cms.service;

import com.system.cms.dto.UserDTO;
import com.system.cms.entity.User;
import com.system.cms.exception.ResourceNotFoundException;
import com.system.cms.mapper.UserMapper;
import com.system.cms.repository.UserRepository;
import com.system.cms.util.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO registerUser(UserDTO dto) {

        User user = UserMapper.toEntity(dto);

        // Save to DB
        User saved = userRepository.save(user);

        return UserMapper.toDTO(saved);
    }

    @Override
    public List<UserDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .toList();
    }

    @Override
    public UserDTO getUserById(Long id) {


            User user = userRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id --> " + id));

            return UserMapper.toDTO(user);

    }

    @Override
    public UserDTO updateUser(Long id, UserDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update fields
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());

        if (dto.getRole() != null) {
            user.setRole(Role.valueOf(dto.getRole()));
        }

        User updated = userRepository.save(user);

        return UserMapper.toDTO(updated);
    }
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);
    }

    public List<Map<String, Object>> getOfficerStats() {

        return userRepository.getOfficerStats()
                .stream()
                .map(obj -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", obj[0]);
                    map.put("name", obj[1]);
                    map.put("phone", obj[2]);
                    map.put("email", obj[3]);
                    map.put("count", obj[4]);
                    return map;
                })
                .toList();
    }

}
