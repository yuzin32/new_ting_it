package com.example.thing_it.controller;

import com.example.thing_it.dto.DiseaseRecommendDto;
import com.example.thing_it.entity.Food;
import com.example.thing_it.repository.DiseaseRepository;
import com.example.thing_it.repository.FoodRepository;
import com.example.thing_it.repository.RecommendedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodApiController {
    private final DiseaseRepository diseaseRepository;
    private final RecommendedRepository recommendedRepository;
    private final FoodRepository foodRepository;// ← 클래스 바로 아래

    @PostMapping("/recommend")
    public List<DiseaseRecommendDto.Response> recommendFoods(@RequestBody DiseaseRecommendDto.Request request) {

        List<Long> diseaseIds = request.getDiseaseIds();

        if (diseaseIds == null || diseaseIds.isEmpty()) {
            return List.of();
        }
        //쿼리실행
        List<DiseaseRecommendDto.View> rows = recommendedRepository.findByDiseaseIds(diseaseIds);
        //질병id별 결과물그룹핑
        Map<Long, List<DiseaseRecommendDto.View>> grouped = rows.stream()
                .collect(Collectors.groupingBy(
                        DiseaseRecommendDto.View::getDiseaseId,
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        return grouped.values().stream()
                .map(list -> new DiseaseRecommendDto.Response(
                        list.get(0).getDiseaseId(),
                        list.get(0).getDiseaseName(),
                        list.stream()
                                .filter(v -> v.getFoodName() != null)
                                .map(v -> new DiseaseRecommendDto.FoodView(
                                        v.getFoodName(),
                                        v.getFoodEffect(),
                                        v.getFoodNutrient()
                                ))
                                .toList()
                ))
                .toList();
    }
}