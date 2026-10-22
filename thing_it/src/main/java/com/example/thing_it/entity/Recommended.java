package com.example.thing_it.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "th_recommended")
@Getter
@Setter
public class Recommended {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "disease_id")
    private Long diseaseId;

    @Column(name = "food_id")
    private Long foodId;
    private String state;
}