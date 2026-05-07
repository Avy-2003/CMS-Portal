package com.system.cms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.system.cms.util.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // CITIZEN, OFFICER, ADMIN

    private String phone;

    @OneToMany(mappedBy = "user")
    @JsonIgnore   // IMPORTANT (avoid infinite loop)
    private List<Complaint> complaints;

    // getters & setters
}