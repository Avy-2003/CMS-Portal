package com.system.cms.entity;

import com.system.cms.util.ComplaintStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    private String category;

    @Column(name = "sub_category")
    private String subCategory;

    private String location;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Citizen who created complaint
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Officer assigned
    @ManyToOne
    @JoinColumn(name = "assigned_officer_id")
    private User assignedOfficer;

    private String priority; // HIGH, MEDIUM, LOW

    // getters & setters
}