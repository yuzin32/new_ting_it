package com.example.thing_it.controller.advice;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class LoginModelAdvice {

    @ModelAttribute("loggedIn")
    public boolean loggedIn(Authentication authentication) {
        return authentication != null
                && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken);
    }

    @ModelAttribute("loginName")
    public String loginName(Authentication authentication) {
        if (authentication == null
                || authentication instanceof AnonymousAuthenticationToken) {
            return null;
        }
        return authentication.getName();   // 로그인 아이디
    }
}