package com.system.cms.dto;

import lombok.Data;

@Data
public class ComplaintDTO {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String location;
    private Long userId;
    private String category;
    private Long assignedOfficerId;
    private String userName;
    private String userPhone;
    private String userEmail;
}
