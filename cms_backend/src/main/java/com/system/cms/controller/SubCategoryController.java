package com.system.cms.controller;

import com.system.cms.dto.SubCategoryDTO;
import com.system.cms.entity.SubCategory;
import com.system.cms.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subcategories")
@CrossOrigin
public class SubCategoryController {

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @GetMapping("/category/{categoryId}")
    public List<SubCategoryDTO> getSubCategories(
            @PathVariable Long categoryId) {

        List<SubCategory> subCategories =
                subCategoryRepository
                        .findByCategoryIdAndIsActiveTrue(categoryId);

        return subCategories.stream()
                .map(subCategory -> {

                    SubCategoryDTO dto = new SubCategoryDTO();

                    dto.setId(subCategory.getId());
                    dto.setSubCategoryName(
                            subCategory.getSubCategoryName()
                    );

                    return dto;
                })
                .toList();
    }
}
