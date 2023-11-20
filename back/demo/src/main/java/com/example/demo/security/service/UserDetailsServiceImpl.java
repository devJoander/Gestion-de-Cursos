package com.example.demo.security.service;

import org.springframework.context.annotation.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.demo.security.entities.Usuario;
import com.example.demo.security.entities.UsuarioPrincipal;

   
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // UsuarioService se encarga de convertir la clase usuario en la clase principal, dicha clase es la que utiliza SSC para mostrar la info según los roles
    @Autowired
    @Lazy
    UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioService.getByEmail(email).get();
        return UsuarioPrincipal.build(usuario);
    }
}