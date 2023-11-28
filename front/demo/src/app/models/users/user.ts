export class user {
    id? : number;
    nombre: string;
    apellido: string;
    estado: string;
    email: string;
    password: string;
    constructor(nombre: string, apellido: string, estado: string, email: string, password: string) {
        this.nombre = nombre;
        this.apellido = apellido
        this.estado = estado;
        this.email = email;
        this.password = password;
    }
}
