package com.example.demo.entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import com.example.demo.entities.Curso;
import com.example.demo.security.entities.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.JoinColumn;

@Data
@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "El campo nombre del curso no puede estar vacío")
    private String nombre;

    @JoinColumn(name = "creador_id")
    @ManyToOne
    private Usuario creador;

    @NotBlank(message = "El campo estado no puede estar vacío")
    @Size(max = 1, message = "El campo estado debe tener un máximo de 1 caracter")
    @Column(name = "estado")
    @Pattern(regexp = "[AIC]", message = "El campo estado solo puede tener los valores: A Activo, I Inactivo")
    private String estado;
    
    @CreatedDate
    @Column(name = "fe_creacion", nullable = false, updatable = false)
    private LocalDateTime feCreacion;

    @LastModifiedDate
    @Column(name = "fe_actualizacion")
    private LocalDateTime feActualizacion;

    @JsonIgnore
    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL)
    private Set<Inscripcion> inscripciones = new HashSet<>();
}