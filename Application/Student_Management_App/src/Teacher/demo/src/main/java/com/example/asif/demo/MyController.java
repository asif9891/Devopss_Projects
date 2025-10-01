package com.example.asif.demo;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@RestController
public class MyController {

    private static final String SECRET_KEY = "YOUR_SHARED_SECRET"; // Same as Node.js secret

    @GetMapping("/home")
    public String home(@RequestParam String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(SECRET_KEY.getBytes())
                                .build()
                                .parseClaimsJws(token)
                                .getBody();

            String email = claims.get("email", String.class); // or getSubject()
            return "Welcome " + email;

        } catch (Exception e) {
            return "Invalid Token";
        }
    }

    
}
