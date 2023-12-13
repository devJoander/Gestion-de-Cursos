package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import com.example.demo.entities.Curso;
import com.example.demo.repository.CursoRepository;
import com.example.demo.security.entities.Usuario;

@Service
@Transactional
public class CursoService {

    @Autowired
    CursoRepository cursoRepository;

    public Curso crearCurso(String nombre, Usuario creador) {
        try {
            if (creador == null) {
                throw new IllegalArgumentException("El usuario creador no puede ser nulo.");
            }

            int cursosActivos = cursoRepository.countCursosActivosByCreadorId(creador.getId());

            if (cursosActivos >= 2) {
                throw new IllegalArgumentException("El usuario creador ha alcanzado el límite de cursos activos.");
            }

            return cursoRepository.crearCurso(nombre, creador.getId(), "A");
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage().toString(), e.getCause());
        }

    }

    public List<Curso> getAllCursos() {
        try {

            List<Curso> curso = cursoRepository.getAllCursos();
            if (curso.isEmpty()) {
             
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No hay cursos disponibles");
            }
            return curso;
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage().toString(), e.getCause());
        }
    }

    public Curso getCursoById(Integer id) {
        try {
            Curso curso_ = cursoRepository.getById(id);
            if (curso_ == null) {
                throw new IllegalArgumentException("Curso no encontrado");
            }
            return cursoRepository.getById(id);
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage().toString(), e.getCause());
        }
    }

    public Curso eliminarCurso(Integer cursoId) {
        try {
            Curso curso_ = cursoRepository.getById(cursoId);
            if (curso_ == null) {
                throw new IllegalArgumentException("Curso no encontrado");
            }
            return cursoRepository.eliminarCurso(cursoId);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage().toString(), e.getCause());
        }
    }

    public Curso updateCurso(Integer cursoId, String nombre, String estado) {

        try {

            Curso cursoExistente = cursoRepository.updateCurso(cursoId, nombre, estado);

            if (cursoExistente != null) {
                return cursoExistente;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Curso no encontrado");
            }

        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage().toString(), e.getCause());
        }
    }

}