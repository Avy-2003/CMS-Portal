package com.system.cms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "evidence")
public class Evidence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileUrl;

    @ManyToOne
    @JoinColumn(name = "complaint_id")
    private Complaint complaint;

    // getters & setters
}
