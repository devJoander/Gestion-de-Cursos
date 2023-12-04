package com.example.demo.security.controller;

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
import com.example.demo.excepciones.Mensaje;
import com.example.demo.security.entities.Rol;
import com.example.demo.security.service.RolService;
import java.util.List;
import javax.validation.Valid;

@RestController
@RequestMapping("/roles")
@CrossOrigin(origins = "*")
public class RolController {

    @Autowired
    RolService rolService;

    @GetMapping("all")
    public ResponseEntity<?> getAllRoles() {
        try {
            List<Rol> list = rolService.getAll();
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje("No se encontraron roles activos"), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage().toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{rolId}")
    public ResponseEntity<?> obtenerRolPorId(@PathVariable Integer rolId) {
        try {
            Rol Rol = rolService.obtenerRolPorId(rolId);
            return new ResponseEntity<>(Rol, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje("El rol que buscas no existe"), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("create")
    public ResponseEntity<?> crear(@Valid @RequestBody Rol rol) {
        try {
            // String nombre = rol.getRolNombre().toString();
            // RolNombre rolNombre = RolNombre.valueOf(nombre);
            Rol rolCreado = rolService.crearRol(rol.getRolNombre(), rol.getEstado());
            return new ResponseEntity<>(rolCreado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> actualizarRol(@PathVariable Integer id, @RequestBody Rol rol) {
        try {
            rolService.actualizarRol(id, rol.getRolNombre().toString(), rol.getEstado());
            return new ResponseEntity<>(rol, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> eliminarRol(@PathVariable Integer id) {
        try {
            Rol rolEliminado = rolService.eliminarRol(id);
            return new ResponseEntity<>(rolEliminado, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(new Mensaje(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
}
