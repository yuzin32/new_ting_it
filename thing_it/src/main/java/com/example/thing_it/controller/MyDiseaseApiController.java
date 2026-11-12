package com.example.thing_it.controller;

import com.example.thing_it.entity.Disease;
import com.example.thing_it.entity.MyDisease;
import com.example.thing_it.dto.DiseaseSaveRequest;
import com.example.thing_it.repository.DiseaseRepository;
import com.example.thing_it.repository.MyDiseaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/my-diseases")
@RequiredArgsConstructor
public class MyDiseaseApiController {

    private final MyDiseaseRepository myDiseaseRepository;
    private final DiseaseRepository diseaseRepository;

    // 1. 선택한 질병 목록 DB 저장
    @PostMapping
    public ResponseEntity<?> saveMyDiseases(@RequestBody DiseaseSaveRequest request) {
        // 👇 테스트를 위해 유저 ID를 16번으로 고정합니다!
        Long currentUserId = 16L;
        // Long currentUserId = 1L; // TODO: 실제 로그인한 유저 ID (Spring Security 세션 등에서 추출)

        if (request.getDiseaseIds() == null || request.getDiseaseIds().isEmpty()) {
            return ResponseEntity.badRequest().body("저장할 질병이 없습니다.");
        }

        for (Long diseaseId : request.getDiseaseIds()) {
            // 이미 해당 유저가 이 질병을 등록했는지 중복 체크
            if (!myDiseaseRepository.existsByUserIdAndDiseaseId(currentUserId, diseaseId)) {

                // Disease 엔티티를 조회
                Disease disease = diseaseRepository.findById(diseaseId).orElse(null);
                if (disease != null) {
                    MyDisease myDisease = new MyDisease();
                    myDisease.setUserId(currentUserId);
                    myDisease.setDisease(disease); // 연관관계 설정
                    myDiseaseRepository.save(myDisease);
                }
            }
        }

        return ResponseEntity.ok("성공적으로 저장되었습니다.");
    }

    // 2. 내 질병 목록 내림차순(최신순) 조회
    @GetMapping
    public ResponseEntity<List<MyDisease>> getMyDiseases() {
        // 👇 조회할 때도 똑같이 16번 유저 기준으로 조회하도록 맞춰줍니다!
        Long currentUserId = 16L;

        List<MyDisease> list = myDiseaseRepository.findAllByUserIdOrderByCreateTimeDesc(currentUserId);
        return ResponseEntity.ok(list);
    }
}