package com.example.thing_it.repository;

import com.example.thing_it.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByIdIn(List<Long> foodIds);
//foodIds 가 id인 정보찾기 명령어

}