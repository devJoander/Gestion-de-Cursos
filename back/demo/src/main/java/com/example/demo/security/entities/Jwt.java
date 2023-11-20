package com.example.demo.security.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// JwtDto se encarga de devolver el token cuando se haces el login
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Jwt { // DTO Data Transfer Object
    
    private String token;
   
}