import { curso } from "../cursos/curso";
import { inscripcion } from "../inscripcion/inscripcion";
import { roles } from "../roles/roles";

export interface user {
    id: number;
    nombre?: string; // El signo de ? asume que puede ser null o number y el ! indica que no será null y será un number
    apellido?: string;
    estado: string;
    email: string;
    password: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
    roles: roles[];
    cursosCreados: curso[];
    cursosInscritos: inscripcion[];
}
