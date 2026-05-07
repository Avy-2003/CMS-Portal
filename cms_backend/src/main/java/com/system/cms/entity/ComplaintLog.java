package com.system.cms.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaint_logs")
public class ComplaintLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action; // CREATED, UPDATED, ASSIGNED

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "complaint_id")
    private Complaint complaint;

    @ManyToOne
    @JoinColumn(name = "performed_by")
    private User performedBy;

    // getters & setters
}
