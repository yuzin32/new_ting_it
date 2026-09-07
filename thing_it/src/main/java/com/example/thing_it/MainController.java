package com.example.thing_it;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    // app.get('/', ...), app.get('/disease'), app.get('/disease.html') 에 대응
    @GetMapping({"/", "/disease"})
    public String renderDiseasePage() {
        return "fragments/disease"; // templates/fragments/disease.html 연결
    }

    @GetMapping("/food")
    public String food() {
        return "fragments/food";
    }
}