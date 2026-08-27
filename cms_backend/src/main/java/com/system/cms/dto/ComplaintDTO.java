package com.system.cms.dto;

import com.system.cms.entity.Category;
import com.system.cms.entity.SubCategory;
import lombok.Data;

@Data
public class ComplaintDTO {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String location;
    private Long userId;
//    private Long categoryId;
//    private Long subCategoryId;
    private String category;
    private String subCategory;
    private Long assignedOfficerId;
    private String userName;
    private String userPhone;
    private String userEmail;
    private String priority;
}
