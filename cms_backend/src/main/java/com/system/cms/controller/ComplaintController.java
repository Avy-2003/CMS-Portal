package com.system.cms.controller;

import com.system.cms.dto.ComplaintDTO;
import com.system.cms.dto.ComplaintStatsDTO;
import com.system.cms.entity.Complaint;
import com.system.cms.repository.ComplaintRepository;
import com.system.cms.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://cms-portal-gamma.vercel.app"
})
@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private ComplaintRepository complaintRepository;

    // Create
    @PostMapping
    public ComplaintDTO create(@RequestBody ComplaintDTO dto) {
        return complaintService.createComplaint(dto);
    }

    // Get all
    @GetMapping
    public List<ComplaintDTO> getAll() {
        return complaintService.getAllComplaints();
    }

    // Get by ID
    @GetMapping("/{id}")
    public ComplaintDTO getById(@PathVariable Long id) {
        return complaintService.getComplaintById(id);
    }

    // Update status
    @PutMapping("/{id}/status")
    public ComplaintDTO updateStatus(@PathVariable Long id,
                                     @RequestParam String status) {
        return complaintService.updateStatus(id, status);
    }

    @PutMapping("/{id}/assign")
    public ComplaintDTO assignComplaint(
            @PathVariable Long id,
            @RequestParam Long officerId) {


        return complaintService.assignComplaint(id, officerId);
    }

    @GetMapping("/officer/{officerId}")
    public List<ComplaintDTO> getByOfficer(@PathVariable Long officerId) {
        return complaintService.getComplaintsByOfficer(officerId);
    }

    @GetMapping("/user/{userId}")
    public List<ComplaintDTO> getByUser(@PathVariable Long userId) {
        return complaintService.getComplaintsByUser(userId);
    }

    @GetMapping("/user/{userId}/stats")
    public Map<String, Long> getUserStats(@PathVariable Long userId) {
        return complaintService.getUserStats(userId);
    }

    @GetMapping("/stats")
    public ComplaintStatsDTO getStats() {
        return complaintService.getAllStats();
    }
    @GetMapping("/withuser")
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAllWithUser();
    }

}
