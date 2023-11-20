package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.entities.Curso;
import com.example.demo.entities.Inscripcion;
import com.example.demo.repository.CursoRepository;
import com.example.demo.repository.InscripcionRepository;
import com.example.demo.security.entities.Usuario;
import com.example.demo.security.repository.UsuarioRepository;


@Service
@Transactional
public class InscripcionService {
    
    @Autowired
    InscripcionRepository InscripcionRepository;
 
    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Inscripcion suscribirUsuarioACurso(Curso curso, Usuario usuario) {
        try {
            
            boolean existeInscripcion = InscripcionRepository.existeInscripcion(curso.getId(), usuario.getId());
         

             if (!cursoRepository.existsById(curso.getId())) {
                throw new IllegalArgumentException("El ID del curso no existe");
            }if(!usuarioRepository.existsById(usuario.getId())){
                throw new IllegalArgumentException("El ID del usuario no existe.");
            }if (existeInscripcion) {
                throw new RuntimeException("El usuario ya se encuentra inscrito en este curso.");
            }
             else {
                Inscripcion inscripcion = InscripcionRepository.crearInscripcion(curso.getId(), usuario.getId());
                return inscripcion;
            }
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage().toString(), e.getCause());
        }
    }
    
    public Inscripcion cancelarSuscripcion(Integer inscripcionId) {
        try {
            // Verificar si el ID de inscripción es válido
            if (inscripcionId != null && inscripcionId > 0) {
                Inscripcion inscripcion = InscripcionRepository.anularSubscripcion(inscripcionId);
                if (inscripcion != null) {
                    return inscripcion;
                } else {
                    throw new IllegalArgumentException("La inscripción no existe.");
                }
            } else {
                throw new IllegalArgumentException("ID de inscripción no válido.");
            }
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage(), e.getCause());
        }
    }

    public Inscripcion suscribirseNuevamente(Integer inscripcionId) {
        try {
            // Verificar si el ID de inscripción es válido
            if (inscripcionId != null && inscripcionId > 0) {
                Inscripcion inscripcion = InscripcionRepository.suscribirseDenuevo(inscripcionId);
                if (inscripcion != null) {
                    return inscripcion;
                } else {
                    throw new IllegalArgumentException("La inscripción no existe.");
                }
            } else {
                throw new IllegalArgumentException("ID de inscripción no válido.");
            }
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage(), e.getCause());
        }
    }
    
    public List<Inscripcion> getAllInscripciones() {
        try {
            List<Inscripcion> Inscripcions = InscripcionRepository.getAllInscripciones();
            if(Inscripcions.isEmpty()){
                throw new IllegalArgumentException("No hay ninguna subscripcion");
            }
            return InscripcionRepository.getAllInscripciones();
            
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage().toString(), e.getCause());
        }
    }

       public List<Inscripcion> getAllInscripcionesDeUnCurso(Integer cursoId) {
        try {
            if (!cursoRepository.existsById(cursoId)) {
                throw new IllegalArgumentException("El ID del curso no existe");
            }

            List<Inscripcion> inscripciones = InscripcionRepository.getAllInscripcionesDeCurso(cursoId);

            if (inscripciones.isEmpty()) {
                throw new IllegalArgumentException("No hay inscripciones para el curso seleccionado");
            }

            return inscripciones;
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error interno del servidor: " + e.getMessage(), e.getCause());
        }
    }
    

     public Inscripcion getInscripcionesById(Integer inscripcionId) {
        try {
            Inscripcion Inscripcion = InscripcionRepository.obtenerInscripcionPorId(inscripcionId);
            if(Inscripcion == null){
                throw new IllegalArgumentException("No existe una isncripción con el id proporcionado.");
            }
            return InscripcionRepository.obtenerInscripcionPorId(inscripcionId);
            
        }  catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage().toString(), e.getCause());
        }
    }
}