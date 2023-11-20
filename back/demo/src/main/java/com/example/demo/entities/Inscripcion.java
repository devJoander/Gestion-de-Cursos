package com.example.demo.entities;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import com.example.demo.security.entities.Usuario;
import lombok.Data;

@Data
@Entity
@Table(name = "inscripcion_curso")
public class Inscripcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;

    @CreatedDate
    @Column(name = "fe_creacion", nullable = false, updatable = false)
    private LocalDateTime feCreacion;

    @LastModifiedDate
    @Column(name = "fe_actualizacion")
    private LocalDateTime feActualizacion;

    @ManyToOne
    @JoinColumn(name = "consumidor_id")
    private Usuario consumidor;

    @Column(name = "activo")
    private boolean activo;

}
