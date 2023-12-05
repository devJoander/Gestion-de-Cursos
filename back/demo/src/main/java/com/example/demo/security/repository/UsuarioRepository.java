package com.example.demo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.security.entities.Usuario;
import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {


    Optional<com.example.demo.security.entities.Usuario> findByEmail(String email);

    /////////////////////////////////////////////////////
    
    boolean existsByEmail(String email);
    boolean existsById(Integer id);

    // @Query(value = "SELECT * FROM insertar_usuario(:nombre, :apellido, :email, :password, :estado);", nativeQuery = true)
    // public Usuario insertarUsuario(
    //     @Param("nombre") String nombre, 
    //     @Param("apellido") String apellido, 
    //     @Param("email") String email, 
    //     @Param("password") String password,
    //     @Param("estado") String estado);

    @Query(value = "SELECT * FROM crear_usuario_con_rol(:nombre, :apellido, :email, :password, :estado, :rolNombre);", nativeQuery = true)
    Usuario crearUsuarioConRol(
        String nombre,
        String apellido,
        String email,
        String password,
        String estado,
        String rolNombre
    );
    
    @Query(value = "SELECT * FROM obtener_usuario_por_id(:p_usuario_id)", nativeQuery = true)
    public Usuario obtenerUsuarioPorId(@Param("p_usuario_id") Integer usuarioId);

    @Query(value = "SELECT * FROM obtener_todos_los_usuarios()", nativeQuery = true)
    public List<Usuario> getAllUsuarios();

     @Query(value = "SELECT * FROM obtener_usuarios_con_rol_creador()", nativeQuery = true)
    public List<Usuario> obtener_usuarios_con_rol_creador();

      @Query(value = "SELECT * FROM obtener_usuarios_con_rol_consumidor()", nativeQuery = true)
    public List<Usuario> obtener_usuarios_con_rol_consumidor();

    @Transactional
    @Query(value = "SELECT * FROM actualizar_usuario(:p_usuario_id, :p_nombre, :p_apellido, :p_email, :p_password, :p_estado)", nativeQuery = true)
    public Usuario actualizarUsuario(
            @Param("p_usuario_id") Integer id,
            @Param("p_nombre") String nombre,
            @Param("p_apellido") String apellido,
            @Param("p_email") String email,
            @Param("p_password") String password,
            @Param("p_estado") String estado
            );

//  @Modifying
    @Transactional
    @Query(value = "SELECT * FROM eliminar_usuario(:p_usuario_id)", nativeQuery = true)
    public Usuario eliminarUsuario(@Param("p_usuario_id") Integer usuarioId);
}
