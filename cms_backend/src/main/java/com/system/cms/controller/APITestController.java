package com.system.cms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class APITestController {

    @GetMapping("/test")
    public String test() {
        return "Backend is running successfully 🚀";
    }
}
