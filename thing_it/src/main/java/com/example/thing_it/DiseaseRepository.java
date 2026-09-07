package com.example.thing_it;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {

    // findBy + 카테고리명 -> category 컬럼을 기준으로 조건 조회
    List<Disease> findByCategory(String category);
}