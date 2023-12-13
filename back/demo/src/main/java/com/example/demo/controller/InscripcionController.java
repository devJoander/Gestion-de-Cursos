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
import com.example.demo.entities.Inscripcion;
import com.example.demo.excepciones.Mensaje;
import com.example.demo.service.InscripcionService;

@RestController
@RequestMapping("/inscripcion")
@CrossOrigin(origins = "*")
public class InscripcionController {
    
    @Autowired
    InscripcionService inscripcionesCursoService;
 
     @GetMapping("/curso/{cursoId}")
    public ResponseEntity<?>obtenerTodasLasInscripcionesDeUnCurso(@PathVariable Integer cursoId) {
        try {
            List<Inscripcion> inscripciones = inscripcionesCursoService.getAllInscripcionesDeUnCurso(cursoId);
            return ResponseEntity.ok(inscripciones);
            
        }catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(ex.getMessage().toString(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage().toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/suscribir")
    public ResponseEntity<?> suscribirUsuarioACurso(@Valid @RequestBody Inscripcion request) {
        try {
            Inscripcion inscripcion = inscripcionesCursoService.suscribirUsuarioACurso(request.getCurso(), request.getConsumidor());
            return ResponseEntity.ok(inscripcion);
            
        }  catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.BAD_REQUEST);
        }catch (Exception e) {
          return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.NOT_FOUND);
      }
    }
    
    @DeleteMapping("/cancelar/{inscripcionId}")
    public ResponseEntity<?> cancelarSuscripcion(@PathVariable Integer inscripcionId) {
        try {
            Inscripcion inscripcion = inscripcionesCursoService.cancelarSuscripcion(inscripcionId);
            return ResponseEntity.ok(inscripcion);
            
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.BAD_REQUEST);
        }catch (Exception e) {
          return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.NOT_FOUND);
      }
    }
    @PutMapping("/again/{inscripcionId}")
    public ResponseEntity<?> suscribirseDenuevo(@PathVariable Integer inscripcionId) {
        try {
            Inscripcion inscripcion = inscripcionesCursoService.suscribirseNuevamente(inscripcionId);
            return ResponseEntity.ok(inscripcion);
            
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.BAD_REQUEST);
        }catch (Exception e) {
          return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.NOT_FOUND);
      }
    }

   @GetMapping("/todos")
    public ResponseEntity<?> getAllInscripciones() {
        try {
            List<Inscripcion> Inscripcions = inscripcionesCursoService.getAllInscripciones();
            return new ResponseEntity<>(Inscripcions, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje("No se encontraron inscripciones"), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{inscripcionId}")
    public ResponseEntity<?> obtenerInscripcionesById(@PathVariable Integer inscripcionId) {
        try {
              Inscripcion inscripciones = inscripcionesCursoService.getInscripcionesById(inscripcionId);
            return ResponseEntity.ok(inscripciones);
        }  catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.BAD_REQUEST);
        }catch (Exception e) {
          return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.NOT_FOUND);
      }
    }
}