package com.example.demo.security.entities;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@Entity
@Table(name = "rol")
@AllArgsConstructor
@NoArgsConstructor
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String  rolNombre;

    @CreatedDate
    @Column(name = "fe_creacion", nullable = false, updatable = false)
    private LocalDateTime feCreacion;

    @LastModifiedDate
    @Column(name = "fe_actualizacion")
    private LocalDateTime feActualizacion;

    @NotBlank(message = "El campo estado no puede estar vacío")
    @Size(max = 1, message = "El campo estado debe tener un máximo de 1 caracter")
    @Column(name = "estado")
    @Pattern(regexp = "[AI]", message = "El campo estado solo puede tener los valores: A Activo, I Inactivo")
    private String estado;

}
