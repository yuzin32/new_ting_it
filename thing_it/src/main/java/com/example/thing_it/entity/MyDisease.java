package com.example.thing_it.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "th_my_disease")
@Getter @Setter
@NoArgsConstructor
public class MyDisease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // th_member 테이블의 idx를 참조하는 회원 ID
    @Column(name = "user_id")
    private Long userId;

    // th_disease 테이블과 다대일(N:1) 관계 매핑 (외래키 disease_id)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_id")
    private Disease disease;

    // DB에서 DEFAULT CURRENT_TIMESTAMP로 자동 생성되는 시간
    @Column(name = "create_time", updatable = false)
    private LocalDateTime createTime;

    @PrePersist
    public void prePersist() {
        this.createTime = LocalDateTime.now();
    }
}