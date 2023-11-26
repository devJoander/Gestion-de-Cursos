package com.example.demo.security.service;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.demo.security.dto.LoginDto;
import com.example.demo.security.entities.Jwt;
import com.example.demo.security.jwt.JwtProvider;

@Service
@Transactional
public class AuthService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtProvider jwtProvider;

     public Jwt login(@Valid @RequestBody LoginDto loginUsuario) {
        try {
            if (loginUsuario.getEmail().isEmpty()) {
                throw new IllegalArgumentException("Ingrese un email por favor.");
            } else if (loginUsuario.getPassword().isEmpty()) {
                throw new IllegalArgumentException("Ingrese una contraseña porfavor.");

            }
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginUsuario.getEmail(), loginUsuario.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateToken(authentication);

            Jwt jwt_ = new Jwt(jwt);
            return jwt_;

        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage(), e.getCause());
        }
    }
}
