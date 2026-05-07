package com.system.cms.service;

import com.system.cms.dto.ComplaintDTO;
import com.system.cms.dto.ComplaintStatsDTO;
import com.system.cms.entity.Complaint;

import java.util.List;
import java.util.Map;

public interface ComplaintService {
    ComplaintDTO createComplaint(ComplaintDTO dto);

    List<ComplaintDTO> getAllComplaints();

    ComplaintDTO getComplaintById(Long id);

    ComplaintDTO updateStatus(Long id, String status);

    ComplaintDTO assignComplaint(Long complaintId, Long officerId);

    List<ComplaintDTO> getComplaintsByOfficer(Long officerId);

    List<ComplaintDTO> getComplaintsByUser(Long userId);
    Map<String, Long> getUserStats(Long userId);
    ComplaintStatsDTO getAllStats();

}
