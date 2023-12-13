package com.example.demo.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entities.Curso;
import com.example.demo.excepciones.Mensaje;
import com.example.demo.service.CursoService;

@RestController
@RequestMapping("/cursos")
@CrossOrigin(origins = "*")
public class CursoController {

    @Autowired
    CursoService cursoService;

    @PostMapping("/crear")
    public ResponseEntity<?> crearCurso(@Valid @RequestBody Curso cursoDTO) {
        try {
            Curso curso = cursoService.crearCurso(cursoDTO.getNombre(), cursoDTO.getCreador());
            return new ResponseEntity<>(curso, HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()),HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listarCursos() {
        try {

            List<Curso> cursos = cursoService.getAllCursos();
            return new ResponseEntity<>(cursos, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()),HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCursoPorId(@PathVariable Integer id) {
        try {
            Curso curso = cursoService.getCursoById(id);
            return ResponseEntity.ok(curso);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()),HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{cursoId}")
    public ResponseEntity<?> updateCurso(@PathVariable Integer cursoId, @RequestBody Curso cursoRequest) {
        try {
            Curso cursoActualizado = cursoService.updateCurso(cursoId, cursoRequest.getNombre(),
                    cursoRequest.getEstado());
            return new ResponseEntity<>(cursoActualizado, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()),HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping  ("/eliminar/{cursoId}")
    public ResponseEntity<?> eliminarCurso(@PathVariable Integer cursoId) {
        try {
            Curso cursoEliminado = cursoService.eliminarCurso(cursoId);
            return new ResponseEntity<>(cursoEliminado, HttpStatus.OK);
         } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()),HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
