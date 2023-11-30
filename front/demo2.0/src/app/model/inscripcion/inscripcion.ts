import { curso } from "../cursos/curso";
import { user } from "../user/user";

export interface inscripcion {
    id : number;
    curso: curso;
    consumidor: user;
    activo: boolean;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}
