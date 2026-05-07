package com.system.cms.mapper;

import com.system.cms.dto.ComplaintDTO;
import com.system.cms.entity.Complaint;
import com.system.cms.util.Category;

public class ComplaintMapper {

    public static Complaint toEntity(ComplaintDTO dto) {
        Complaint c = new Complaint();
        c.setTitle(dto.getTitle());
        c.setDescription(dto.getDescription());
        c.setLocation(dto.getLocation());
        // Category
        if (dto.getCategory() != null) {
            c.setCategory(Category.valueOf(dto.getCategory().toUpperCase()));
        }
        return c;
    }

    public static ComplaintDTO toDTO(Complaint c) {

        ComplaintDTO dto = new ComplaintDTO();

        dto.setId(c.getId());
        dto.setTitle(c.getTitle());
        dto.setDescription(c.getDescription());
        dto.setStatus(c.getStatus().name());
        dto.setLocation(c.getLocation());
        dto.setCategory(String.valueOf(c.getCategory()));

        if (c.getUser() != null) {
            dto.setUserId(c.getUser().getId());
            dto.setUserName(c.getUser().getName());
            dto.setUserPhone(c.getUser().getPhone());
            dto.setUserEmail(c.getUser().getEmail());
        }

        if (c.getAssignedOfficer() != null) {
            dto.setAssignedOfficerId(c.getAssignedOfficer().getId());
        }

        return dto;
    }
}
