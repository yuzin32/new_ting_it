package com.example.thing_it.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "th_member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx; // 기본키(PK)

    @Column(name = "userid")
    private String userid;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 10)
    private String gender;

    @Column(nullable = false, length = 1)
    private String terms_agree;
    @Column(nullable = false, length = 1)
    private String privacy_agree;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false, length = 20)
    private String role;

    protected Member() {
    }

    public Member(String userid,String name, String email,
                  String password, String gender,String terms_agree,String privacy_agree,String role) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.createdAt = LocalDateTime.now();
        this.terms_agree = terms_agree;
        this.privacy_agree = privacy_agree;
        this.role = role;
    }

    public String getUserid() { return userid; }
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
    public String getTerms_agree() {
        return terms_agree;
    }
    public String getPrivacy_agree() { return privacy_agree; }
    public String getRole() { return role; }
}