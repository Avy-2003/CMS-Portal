package com.system.cms.mapper;

import com.system.cms.dto.ComplaintDTO;
import com.system.cms.entity.Complaint;

public class ComplaintMapper {

    public static Complaint toEntity(ComplaintDTO dto) {

        Complaint c = new Complaint();

        c.setTitle(dto.getTitle());
        c.setDescription(dto.getDescription());
        c.setLocation(dto.getLocation());
        c.setCategory(dto.getCategory() != null ? dto.getCategory() : null);
        c.setSubCategory(dto.getSubCategory() != null ? dto.getSubCategory() : null);
        c.setPriority(dto.getPriority() != null ? dto.getPriority() : null);
        return c;
    }

    public static ComplaintDTO toDTO(Complaint c) {

        ComplaintDTO dto = new ComplaintDTO();

        dto.setId(c.getId());
        dto.setTitle(c.getTitle());
        dto.setDescription(c.getDescription());

        if (c.getStatus() != null) {
            dto.setStatus(c.getStatus().name());
        }

        dto.setLocation(c.getLocation());

        // Category
        dto.setCategory(c.getCategory());

        // Sub Category
        dto.setSubCategory(c.getSubCategory());

        // Citizen
        if (c.getUser() != null) {

            dto.setUserId(c.getUser().getId());
            dto.setUserName(c.getUser().getName());
            dto.setUserPhone(c.getUser().getPhone());
            dto.setUserEmail(c.getUser().getEmail());
        }

        // Assigned Officer
        if (c.getAssignedOfficer() != null) {
            dto.setAssignedOfficerId(
                    c.getAssignedOfficer().getId()
            );
        }
        dto.setPriority(c.getPriority());

        return dto;
    }
}