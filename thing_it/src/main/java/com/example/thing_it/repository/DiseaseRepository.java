package com.example.thing_it.repository;

import com.example.thing_it.entity.Disease;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {

    List<Disease> findByCategory(String category);
}