package com.example.thing_it.service;

import com.example.thing_it.dto.SignupRequest;
import com.example.thing_it.entity.Member;
import com.example.thing_it.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void signup(SignupRequest request) {

        // 이메일 중복 검사
        if (memberRepository.existsByEmail(
                request.getEmail().trim())) {
            throw new IllegalArgumentException(
                    "이미 가입된 이메일입니다.");
        }

        // 비밀번호 암호화
        String encodedPassword =
                passwordEncoder.encode(request.getPassword());
        // 회원 객체 생성 및 DB 저장
        Member member = new Member(
                request.getUserid().trim(),
                request.getName().trim(),
                request.getEmail().trim(),
                encodedPassword,
                request.getGender(),
                request.getTerms_agree(),
                request.getPrivacy_agree(),
                "ROLE_USER"
        );
        memberRepository.save(member);
    }

}