package com.example.demo.security.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.security.emuns.RolNombre;
import com.example.demo.security.entities.Rol;
  

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {

    Optional<Rol> findByRolNombre(String rolNombre);
    boolean existsByRolNombre(RolNombre rolNombre);
    boolean existsById(Integer id);


    @Query(value = "SELECT * FROM get_All_Roles();", nativeQuery = true)
    List<Rol> getAllRoles();

    @Query(value = "SELECT * FROM crear_rol(:p_nombre, :p_estado);", nativeQuery = true)
    public Rol crearRol(@Param("p_nombre") RolNombre nombre, @Param("p_estado") String estado);
    
    @Transactional
    @Query(value = "SELECT * FROM actualizar_rol(:p_rol_id, :p_nombre, :p_estado)", nativeQuery = true)
    public Rol actualizarRol(@Param("p_rol_id") Integer id, @Param("p_nombre")  String nombre, @Param("p_estado") String estado);

    @Transactional
    @Query(value = "SELECT * FROM eliminar_rol(:p_rol_id)", nativeQuery = true)
    public Rol eliminarRol(@Param("p_rol_id") Integer rolId);
}