package com.example.thing_it.controller;

import com.example.thing_it.dto.SignupRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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

//    // 회원가입 화면
//    @GetMapping("/signup")
//    public String signupForm() {
//        return "signup";
//    }

    // 회원가입 처리
    @PostMapping("/signup")
    public String signup(
            @ModelAttribute SignupRequest request,
            Model model,
            RedirectAttributes redirectAttributes) {

        try {

            memberService.signup(request);

            redirectAttributes.addFlashAttribute(
                    "successMessage",
                    "회원가입이 완료되었습니다."
            );
            return "redirect:/login";

        } catch (IllegalArgumentException e) {
            model.addAttribute("signupRequest", request); //입력하지 않아 오류가나도 입력값이 사라지지않게
            String message = e.getMessage();
            if ("아이디를 입력해주세요.".equals(message)) {
                model.addAttribute("idError", message);

            } else if ("이름을 입력해주세요.".equals(message)) {
                model.addAttribute("nameError", message);

            } else if ("이메일을 입력해주세요.".equals(message)) {
                model.addAttribute("emailError", message);

            } else if ("비밀번호는 8자 이상 입력해주세요.".equals(message)) {
                model.addAttribute("passwordError", message);

            } else if ("비밀번호가 일치하지 않습니다.".equals(message)) {
                model.addAttribute("passwordConfirmError", message);

            } else if ("성별을 선택해주세요.".equals(message)) {
                model.addAttribute("genderError", message);
            }

            return "signup";
        }
    }
}