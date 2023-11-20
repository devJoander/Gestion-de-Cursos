package com.example.demo.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.security.emuns.RolNombre;
import com.example.demo.security.entities.Rol;
import com.example.demo.security.repository.RolRepository;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RolService {

    @Autowired
    RolRepository rolRepository;

    public Optional<Rol> getByRolNombre(String rolNombre) {
        try {
            return rolRepository.findByRolNombre(rolNombre);
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage().toString(), e.getCause());
        }
    }

    public List<Rol> getAll() {
        try {

            List<Rol> roles = rolRepository.getAllRoles();
            if (roles.isEmpty()) {
                throw new IllegalArgumentException("No se encontraron roles activos");
            }
            return roles;
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage().toString(), e.getCause());
        }

    }

    public Rol actualizarRol(Integer id, String nombre, String estado) {

        try {
            if (!rolRepository.existsById(id)) {
                throw new IllegalArgumentException("El id del rol no existe");
            }
            return rolRepository.actualizarRol(id, nombre, estado);

        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage().toString(), e.getCause());
        }
    }

    public Rol crearRol(RolNombre nombre, String estado) {
        try {
 
            if (nombre == null) {
                throw new RuntimeException("El nombre del rol no puede ser nulo.");
            }

            if (estado.isEmpty()) {
                throw new RuntimeException("El estado del rol no puede estar vacío.");
            }

            if (rolRepository.existsByRolNombre(nombre)) {
                throw new RuntimeException("El nombre del rol ya existe.");
            }

            return rolRepository.crearRol(nombre, estado);
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage().toString(), e.getCause());
        }
    }

    public Rol eliminarRol(Integer rolId) {
        try {
            if (!rolRepository.existsById(rolId)) {
                throw new IllegalArgumentException("El id del rol no existe");
            }
            return rolRepository.eliminarRol(rolId);
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage().toString(), e.getCause());
        }
    }
}