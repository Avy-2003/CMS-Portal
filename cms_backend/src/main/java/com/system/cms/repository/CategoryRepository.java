package com.system.cms.repository;

import com.system.cms.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByCategoryName(String categoryName);
    List<Category> findByIsActiveTrue();
}