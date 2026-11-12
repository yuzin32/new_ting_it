package com.example.thing_it.repository;

import com.example.thing_it.entity.MyDisease;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MyDiseaseRepository extends JpaRepository<MyDisease, Long> {

    // 1. 최근 저장한 항목이 맨 위에 오도록 내림차순 정렬 (createTime 기준)
    List<MyDisease> findAllByUserIdOrderByCreateTimeDesc(Long userId);

    // 2. 특정 유저가 이미 해당 질병(disease_id 기준)을 등록했는지 중복 확인용
    boolean existsByUserIdAndDiseaseId(Long userId, Long diseaseId);
}