package com.example.thing_it.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "th_member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx; // 기본키(PK)

    @Column(name = "id")
    private String id;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 10)
    private String gender;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    protected Member() {
    }

    public Member(String id,String name, String email,
                  String password, String gender) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getGender() {
        return gender;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}