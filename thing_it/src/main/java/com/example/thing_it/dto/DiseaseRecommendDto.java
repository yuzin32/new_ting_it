package com.example.thing_it.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DiseaseRecommendDto {

    @Getter @Setter
    public static class Request {
        private List<Long> diseaseIds;
    }

    public interface View {
        Long getDiseaseId();
        String getDiseaseName();
        String getFoodName();
        Long getFoodId();
        String getFoodEffect();
        String getFoodNutrient();
    }

    public record FoodView(Long foodId, String foodName, String foodEffect, String foodNutrient) {}

    public record Response(Long diseaseId, String diseaseName, List<FoodView> foods) {}

}