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
    InscripcionRepository inscripcionRepository;
 
    @Autowired
    CursoRepository cursoRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    public Inscripcion suscribirUsuarioACurso(Curso curso, Usuario usuario) {
        try {
            
            boolean existeInscripcion = inscripcionRepository.existeInscripcion(curso.getId(), usuario.getId());

            String ids = curso.getCreador().getId().toString();
            // Integer idCreador = Integer.parseInt(ids);
            // boolean resultadoConsulta = inscripcionRepository.usuarioTieneSuscripcionACreador(usuario.getId(), idCreador);
            // System.out.println("Resultado de la consulta: " + resultadoConsulta);
            

            if (!cursoRepository.existsById(curso.getId())) {
                throw new IllegalArgumentException("El ID del curso no existe");
            }  if (!usuarioRepository.existsById(usuario.getId())) {
                throw new IllegalArgumentException("El ID del usuario no existe.");
            }  if (existeInscripcion) {
                throw new RuntimeException("El usuario ya se encuentra inscrito en este curso.");
            // } if (resultadoConsulta) {
            //     throw new RuntimeException("El usuario ya se encuentra inscrito en un curso del creador: " + curso.getCreador().getNombre());
            } else {
                Inscripcion inscripcion = inscripcionRepository.crearInscripcion(curso.getId(), usuario.getId());
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
                Inscripcion inscripcion = inscripcionRepository.anularSubscripcion(inscripcionId);
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
                Inscripcion inscripcion = inscripcionRepository.suscribirseDenuevo(inscripcionId);
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
            List<Inscripcion> Inscripcions = inscripcionRepository.getAllInscripciones();
            if(Inscripcions.isEmpty()){
                throw new IllegalArgumentException("No hay ninguna subscripcion");
            }
            return inscripcionRepository.getAllInscripciones();
            
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

            List<Inscripcion> inscripciones = inscripcionRepository.getAllInscripcionesDeCurso(cursoId);

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
            Inscripcion Inscripcion = inscripcionRepository.obtenerInscripcionPorId(inscripcionId);
            if(Inscripcion == null){
                throw new IllegalArgumentException("No existe una isncripción con el id proporcionado.");
            }
            return inscripcionRepository.obtenerInscripcionPorId(inscripcionId);
            
        }  catch (RuntimeException ex) {
            throw new IllegalArgumentException(ex.getMessage().toString(), ex.getCause());
        } catch (Exception e) {
            throw new IllegalArgumentException(e.getMessage().toString(), e.getCause());
        }
    }
}