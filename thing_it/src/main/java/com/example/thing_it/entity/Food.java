package com.example.thing_it.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "th_Food") // DB 테이블 이름 매핑
@Getter @Setter
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 기본키(PK)

    private String name;           // 질병명
    
    @Column(columnDefinition = "TEXT")
    private String effect;    // 효과
    
    private String img;        // 음식이미지

    @Column( columnDefinition = "TEXT")
    private String nutrient;   //영양소
}