package com.example.demo.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.security.entities.Rol;
import com.example.demo.security.entities.Usuario;
import com.example.demo.security.repository.RolRepository;
import com.example.demo.security.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RolRepository rolRepository;


    public Optional<Usuario> getByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
 
    /////////////////////////////////
    public Usuario obtenerUsuarioPorId(int usuarioId) {
        try {
            Usuario usuario = usuarioRepository.obtenerUsuarioPorId(usuarioId);
            if (usuario == null) {
                throw new IllegalArgumentException("El usuario con el id: " + usuarioId + " no existe");
            }
            return usuario;
            
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage().toString(), e.getCause());
        }
    }

    public List<Usuario> obtenerTodosLosUsuarios() {
        try {
            
            List<Usuario> usuarios = usuarioRepository.getAllUsuarios();
            if (usuarios.isEmpty()) {
                throw new IllegalArgumentException("No se encontraron usuarios activos");
            }
            return usuarios;
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage(), e.getCause());
        }
    }

    public Usuario actualizarUsuario(Integer id, String nombre, String apellido, String email, String password, String estado) {
        try {
            if (!usuarioRepository.existsById(id)) {
                throw new IllegalArgumentException("El id no existe.");
            }
            //    password = passwordEncoder.encode(password);
    
            return usuarioRepository.actualizarUsuario(id, nombre, apellido, email, password, estado);
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage(), e.getCause());
        }
    }
    

    public Usuario eliminarUsuario(Integer usuarioId) {
        try {
            if(!usuarioRepository.existsById(usuarioId)){
                throw new IllegalArgumentException("El id no existe existe.");
            }
            return usuarioRepository.eliminarUsuario(usuarioId);
        }catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage(), e.getCause());
        }
    }

    public Usuario crearUsuarioConRol(Usuario nuevoUsuario) {
        try {
            if (usuarioRepository.existsByEmail(nuevoUsuario.getEmail())) {
                throw new IllegalArgumentException("El email que ingresaste ya existe.");
            }
            if (nuevoUsuario.getNombre().isEmpty()) {
                throw new IllegalArgumentException("El nombre no puede ser vacío.");
            }
            if (nuevoUsuario.getApellido().isEmpty()) {
                throw new IllegalArgumentException("El apellido no puede ser vacío.");
            }
            if (nuevoUsuario.getPassword().isEmpty()) {
                throw new IllegalArgumentException("La contraseña no puede ser vacía.");
            }
            if (nuevoUsuario.getEstado().isEmpty()) {
                throw new IllegalArgumentException("El estado no puede ser vacío.");
            }
    
            String hashedPassword = passwordEncoder.encode(nuevoUsuario.getPassword());
    
            Optional<Rol> optionalRol = nuevoUsuario.getRoles()
                .stream()
                .findFirst();
    
            Rol rol = optionalRol.orElse(null); // Valor predeterminado null si no se encuentra un rol
    
            return usuarioRepository.crearUsuarioConRol(
                nuevoUsuario.getNombre(),
                nuevoUsuario.getApellido(),
                nuevoUsuario.getEmail(),
                hashedPassword,
                nuevoUsuario.getEstado(),
                rol != null ? rol.getRolNombre().toString() : "ROLE_CONSUMIDOR");
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error " + e.getMessage(), e.getCause());
        }
    }
    
    
}

 