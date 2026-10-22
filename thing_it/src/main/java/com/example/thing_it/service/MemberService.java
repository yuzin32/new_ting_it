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

        if (request.getId() == null
                || request.getId().isBlank()) {
            throw new IllegalArgumentException("아이디를 입력해주세요.");
        }

        // 필수 입력값 검사
        if (request.getName() == null
                || request.getName().isBlank()) {
            throw new IllegalArgumentException("이름을 입력해주세요.");
        }

        if (request.getEmail() == null
                || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("이메일을 입력해주세요.");
        }

        if (request.getPassword() == null
                || request.getPassword().length() < 8) {
            throw new IllegalArgumentException(
                    "비밀번호는 8자 이상 입력해주세요.");
        }
        // 비밀번호 확인
        if (!request.getPassword().equals( request.getPasswordConfirm())) {
            throw new IllegalArgumentException(
                    "비밀번호가 일치하지 않습니다.");
        }

        // 성별 검사
        if (!"MALE".equals(request.getGender())
                && !"FEMALE".equals(request.getGender())) {
            throw new IllegalArgumentException(
                    "성별을 선택해주세요.");
        }

        // 필수 약관 동의 확인
        /*
        if (!Boolean.TRUE.equals(request.getTermsAgreed())
                || !Boolean.TRUE.equals(request.getPrivacyAgreed())) {
            throw new IllegalArgumentException(
                    "필수 약관에 동의해주세요.");
        }
        */

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
                request.getId().trim(),
                request.getName().trim(),
                request.getEmail().trim(),
                encodedPassword,
                request.getGender()
        );
        memberRepository.save(member);
    }
}