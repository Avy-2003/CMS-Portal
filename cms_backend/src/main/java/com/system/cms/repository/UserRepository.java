package com.system.cms.repository;

import com.system.cms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("""
SELECT u.id, u.name, u.phone, u.email, COUNT(c.id)
FROM User u
LEFT JOIN Complaint c ON c.assignedOfficer.id = u.id
WHERE u.role = 'OFFICER'
GROUP BY u.id, u.name, u.phone, u.email
""")
    List<Object[]> getOfficerStats();
}
