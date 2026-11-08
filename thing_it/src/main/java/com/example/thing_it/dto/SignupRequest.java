package com.example.thing_it.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
public class SignupRequest {
    @NotBlank(message = "아이디를 입력해주세요.*")
    private String userid;

    @NotBlank(message = "이름을 입력해주세요.*")
    private String name;

    @NotBlank(message = "이메일을 입력해주세요.*")
    private String email;

    @NotBlank(message = "비밀번호를 입력해주세요.*")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$",
            message = "비밀번호는 8자 이상, 영문·숫자·특수문자를 모두 포함해야 합니다.*")
    private String password;

    private String passwordConfirm;

    @NotNull(message = "성별을 선택해주세요.*")
    private String gender;

    @NotNull(message = "이용약관 동의를 해주세요.*")
    private String terms_agree;

    @NotNull(message = "개인정보 수집·이용 동의를 해주세요.*")
    private String privacy_agree;



    public String getUserid() {
        return userid;
    }
    public void setUserid(String userid) {  this.userid = userid;}

    public String getName() { return name;  }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }
    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getTerms_agree() {  return terms_agree;}
    public void setTerms_agree(String terms_agree) {
        this.terms_agree = terms_agree;
    }

    public String getPrivacy_agree() {
        return privacy_agree;
    }
    public void setPrivacy_agree(String privacy_agree) {
        this.privacy_agree = privacy_agree;
    }


}