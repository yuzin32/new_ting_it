package com.example.thing_it.controller;

import com.example.thing_it.entity.Disease;
import com.example.thing_it.repository.DiseaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MainController {

    private final DiseaseRepository diseaseRepository;

    @GetMapping({"/", "/disease"})
    public String renderDiseasePage(Model model) {
        model.addAttribute("currentPage", "disease");
        return "/disease";
    }
    @GetMapping("/food")
    public String food(Model model) {
        // DB에서 질병 전체 조회
        List<Disease> diseases = diseaseRepository.findAll();
        model.addAttribute("currentPage", "food");
        // Thymeleaf에서 사용할 이름으로 전달
        model.addAttribute("diseases", diseases);
        // templates/fragments/food.html 반환
        return "/food";
    }
}