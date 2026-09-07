package com.example.thing_it;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "th_disease") // DB 테이블 이름 매핑
@Getter @Setter
public class Disease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 기본키(PK)

    private String name;           // 질병명
    private String category;       // 카테고리 (간질환, 위장질환 등)
    private String description;    // 요약 설명

    @Column(columnDefinition = "TEXT")
    private String cause;          // 주요 원인

    @Column(name = "eating_habits", columnDefinition = "TEXT")
    private String eatingHabits;   // 추천 식습관 (DB 컬럼명 eating_habits)

    @Column(name = "care_guide", columnDefinition = "TEXT")
    private String careGuide;      // 관리 방법 (DB 컬럼명 care_guide)
}