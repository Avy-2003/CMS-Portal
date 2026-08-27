package com.system.cms.repository;

import com.system.cms.entity.Category;
import com.system.cms.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {

    Optional<SubCategory> findBySubCategoryName(String subCategoryName);

    Optional<SubCategory> findBySubCategoryNameAndCategoryId(
            String subCategoryName,
            Long categoryId
    );

    List<SubCategory> findByCategoryIdAndIsActiveTrue(Long categoryId);
}