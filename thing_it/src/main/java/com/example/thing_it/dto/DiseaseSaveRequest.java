package com.example.thing_it.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class DiseaseSaveRequest {
    // 사용자가 선택한 질병들의 ID(PK) 목록만 받으면 됩니다.
    private List<Long> diseaseIds;
}