package com.example.thing_it.controller;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/diseases")
public class DiseaseApiController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/{category}")
    public List<Map<String, Object>> getDiseasesByCategory(@PathVariable String category) {
        // disease.js에서 보낸 dbCategory("간질환", "뇌·신경질환" 등)로 DB 조회
        String sql = "SELECT * FROM th_disease WHERE category = ?";
        return jdbcTemplate.queryForList(sql, category);
    }
}