
package com.example.thing_it.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/signup",
                                "/login",
                                "/css/**",
                                "/js/**",
                                "/img/**"
                        ).permitAll()
                        .anyRequest().permitAll()
                );

        // CSRF 보호는 기본 설정대로 유지합니다.
        return http.build();
    }
}
