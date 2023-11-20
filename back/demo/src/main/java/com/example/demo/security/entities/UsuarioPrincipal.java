package com.example.demo.security.entities;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

// Gestiona los accesos al sistema según los privilegios
public class UsuarioPrincipal implements UserDetails {
    private String nombre;
    private String apellido;
     private String email;
    private String password;
    private String estado;
    private Collection<? extends GrantedAuthority> authorities;

    public UsuarioPrincipal(String nombre, String apellido,   String email, String password, String estado , Collection<? extends GrantedAuthority> authorities) {
        this.nombre = nombre;
        this.apellido = apellido;
         this.email = email;
        this.password = password;
        this.estado = estado;
        this.authorities = authorities;
    }

    // este método asigna los privilegios a cada usuario
    public static UsuarioPrincipal build(Usuario usuario){
        List<GrantedAuthority> authorities =
                usuario.getRoles().stream().map(rol -> new SimpleGrantedAuthority(rol
                .getRolNombre().name())).collect(Collectors.toList());
               // .getRolNombre())).collect(Collectors.toList());

        return new UsuarioPrincipal(usuario.getNombre(), usuario.getApellido(),  usuario.getEmail(), usuario.getPassword(), usuario.getEstado(), authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getEstado() {
        return estado;
    }
    public String getEmail() {
        return email;
    }
}
