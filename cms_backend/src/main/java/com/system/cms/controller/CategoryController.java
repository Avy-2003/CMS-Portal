package com.system.cms.controller;

import com.system.cms.dto.CategoryDTO;
import com.system.cms.entity.Category;
import com.system.cms.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<CategoryDTO> getAllCategories() {

        return categoryRepository.findByIsActiveTrue()
                .stream()
                .map(category -> {

                    CategoryDTO dto = new CategoryDTO();

                    dto.setId(category.getId());
                    dto.setCategoryName(
                            category.getCategoryName()
                    );

                    return dto;

                })
                .toList();
    }
}
