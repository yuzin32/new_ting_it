package com.example.thing_it.repository;

import com.example.thing_it.entity.Disease;
import com.example.thing_it.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {

    List<Disease> findByCategory(String category);
    @Query("SELECT DISTINCT d.category FROM Disease d")
    List<String> findDistinctCategory();
}