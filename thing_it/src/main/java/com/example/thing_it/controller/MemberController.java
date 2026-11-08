package com.example.thing_it.controller;

import com.example.thing_it.dto.SignupRequest;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MemberController {

    private final com.example.thing_it.service.MemberService memberService;

    public MemberController(com.example.thing_it.service.MemberService memberService) {
        this.memberService = memberService;
    }
// 회원가입 처리
//실패한 항목을 bindingResult에 담음
    @PostMapping("/signup")
    public String signup(@Valid @ModelAttribute("signupRequest") SignupRequest request,
                         BindingResult bindingResult,
                         Model model) {
        //비밀번호 확인에 오류 확인
        if (!bindingResult.hasFieldErrors("passwordConfirm")
                && request.getPassword() != null
                && !request.getPassword().equals(request.getPasswordConfirm())) {
            bindingResult.rejectValue("passwordConfirm", "mismatch", "비밀번호가 일치하지 않습니다.");
        }

        //나머지 입력값오류
        if (bindingResult.hasErrors()) {
            bindingResult.getFieldErrors().forEach(fe -> {
                String field = fe.getField();
                String key = (field.equals("terms_agree") || field.equals("privacy_agree"))
                        ? "agreeError"
                        : field + "Error";

                if (!model.containsAttribute(key)) {      // 같은 키는 첫 메시지만 유지
                    model.addAttribute(key, fe.getDefaultMessage());
                }
            });
            return "signup";
        }
        memberService.signup(request);
        return "redirect:/login";
    }
}