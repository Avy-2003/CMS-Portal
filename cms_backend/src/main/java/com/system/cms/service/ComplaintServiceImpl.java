package com.system.cms.service;

import com.system.cms.dto.ComplaintDTO;
import com.system.cms.dto.ComplaintStatsDTO;
import com.system.cms.entity.Complaint;
import com.system.cms.entity.User;
import com.system.cms.exception.ResourceNotFoundException;
import com.system.cms.mapper.ComplaintMapper;
import com.system.cms.repository.ComplaintRepository;
import com.system.cms.repository.UserRepository;
import com.system.cms.util.ComplaintStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ComplaintDTO createComplaint(ComplaintDTO dto) {

        Complaint complaint = ComplaintMapper.toEntity(dto);

        // set default status
        complaint.setStatus(ComplaintStatus.NEW);
        complaint.setCreatedAt(LocalDateTime.now());

        // link user
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        complaint.setUser(user);

        Complaint saved = complaintRepository.save(complaint);

        return ComplaintMapper.toDTO(saved);
    }

    @Override
    public List<ComplaintDTO> getAllComplaints() {
        return complaintRepository.findAll()
                .stream()
                .map(ComplaintMapper::toDTO)
                .toList();
    }

    @Override
    public ComplaintDTO getComplaintById(Long id) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        return ComplaintMapper.toDTO(complaint);
    }

    @Override
    public ComplaintDTO updateStatus(Long id, String status) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        complaint.setStatus(ComplaintStatus.valueOf(status));

        return ComplaintMapper.toDTO(complaintRepository.save(complaint));
    }

    @Override
    public ComplaintDTO assignComplaint(Long complaintId, Long officerId) {


        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        User officer = userRepository.findById(officerId)
                .orElseThrow(() -> new RuntimeException("Officer not found"));

        // check role
        if (!officer.getRole().name().equals("OFFICER")) {
            throw new RuntimeException("User is not an officer");
        }

        complaint.setAssignedOfficer(officer);
        complaint.setStatus(ComplaintStatus.NEW);

        Complaint saved = complaintRepository.save(complaint);

        return ComplaintMapper.toDTO(saved);
    }

    @Override
    public List<ComplaintDTO> getComplaintsByOfficer(Long officerId) {

        return complaintRepository.findByOfficerWithUser(officerId)
                .stream()
                .map(ComplaintMapper::toDTO)
                .toList();
    }

    @Override
    public List<ComplaintDTO> getComplaintsByUser(Long userId) {
        return complaintRepository.findByUserId(userId)
                .stream()
                .map(ComplaintMapper::toDTO)
                .toList();
    }

    public Map<String, Long> getUserStats(Long userId) {

        long total = complaintRepository.countByUserId(userId);
        long resolved = complaintRepository.countByUserIdAndStatus(userId, ComplaintStatus.RESOLVED);
        long pending = complaintRepository.countByUserIdAndStatus(userId, ComplaintStatus.PENDING);
        long new1 = complaintRepository.countByUserIdAndStatus(userId, ComplaintStatus.NEW);
        long inprogress = complaintRepository.countByUserIdAndStatus(userId, ComplaintStatus.IN_PROGRESS);

        Map<String, Long> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("resolved", resolved);
        stats.put("pending", pending);
        stats.put("inProgress", inprogress);
        stats.put("new", new1);

        return stats;
    }

    public ComplaintStatsDTO getAllStats() {
        List<Complaint> complaints = complaintRepository.findAll();

        long total = complaints.size();

        long resolved = complaints.stream()
                .filter(c -> c.getStatus() == ComplaintStatus.RESOLVED)
                .count();
        long pending = complaints.stream().filter(c -> c.getStatus()==ComplaintStatus.PENDING).count();
        long inProgress = complaints.stream().filter(c -> c.getStatus()==ComplaintStatus.IN_PROGRESS).count();
        long newCount = complaints.stream().filter(c -> c.getStatus()==ComplaintStatus.NEW).count();

        return new ComplaintStatsDTO(total, resolved, pending, inProgress, newCount);
    }

    }


