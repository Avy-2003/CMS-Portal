package com.system.cms.repository;

import com.system.cms.entity.Complaint;
import com.system.cms.util.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    @Query("SELECT c FROM Complaint c JOIN FETCH c.user WHERE c.assignedOfficer.id = :officerId")
    List<Complaint> findByOfficerWithUser(@Param("officerId") Long officerId);
    List<Complaint> findByUserId(Long userId);
    long countByUserId(Long userId);

    long countByUserIdAndStatus(Long userId, ComplaintStatus status);
    @Query("SELECT c FROM Complaint c JOIN FETCH c.user")
    List<Complaint> findAllWithUser();

}
