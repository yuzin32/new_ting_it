package com.example.thing_it.dto;

public class SignupRequest {
    private String id;
    private String name;
    private String email;
    private String password;
    private String passwordConfirm;
    private String gender;

    public String getId() {
        return id;
    }
    public void setId(String id) {  this.name = id;}

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

}