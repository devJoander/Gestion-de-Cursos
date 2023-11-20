package com.example.demo.security.dto;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginDto {
    
    @NotNull
    @Email(message = "El correo no es válido.")
	@Size(min = 5, max = 255, message = "El correo debe ser mayor a 5 y menor a 255 caracteres.")
	@NotEmpty(message = "El correo es obligatorio.")
    @Column(name = "email")
    private String email;

    @NotNull(message="El campo password no puede ser nulo")
    @NotBlank(message = "El campo password no puede estar vacio")
    private String password;
}
