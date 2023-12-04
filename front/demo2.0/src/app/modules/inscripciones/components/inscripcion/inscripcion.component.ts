import { Component } from '@angular/core';
import { inscripcion } from 'src/app/model/inscripcion/inscripcion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InscripcionService } from 'src/app/services/inscripciones/inscripcion.service';
import { curso } from 'src/app/model/cursos/curso';
import { user } from 'src/app/model/user/user';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { UsersService } from 'src/app/services/users/users.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent {

  inscripcionById!: inscripcion;

  inscripciones: inscripcion[] = [];
  cursos: curso[] = [];
  users: user[] = [];

  isAdmin = false;
  isCreator = false;

  inscripcionForm!: FormGroup;

  actionType: 'create' | 'update' | 'delete' | 'see' = 'create';

  setActionType(action: 'create' | 'update' | 'delete' | 'see') {
    this.actionType = action;
  }

  readonlyFields = {
    consumidor: false,
    curso: false,
  };


  constructor(
    private readonly fb: FormBuilder,
    private inscripcionService: InscripcionService,
    private cursosService: CursosService,
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {

  }

  ngOnInit() {
    this.isAdmin = this.tokenService.isAdmin();
    this.isCreator = this.tokenService.isCreador();
    this.getAllInscripciones();
    this.getAllUsers();
    this.getAllCursos();
    this.inscripcionForm = this.initForm(this.inscripcionById);
  }

  getAllCursos() {
    this.cursosService.getAllCursos().subscribe({
      next: (value) => {
        this.cursos = value;
      },
      error: (err) => {
        console.error('Error fetching curso:', err);
      },
      complete: () => {
      },
    });
  }

  newInscripcion() {
    const newInscripcion = this.inscripcionForm.value;

    // Obtener información sobre el consumidor
    this.usersService.getUserById(newInscripcion.consumidor).subscribe(
      (user) => {
        // Asignar el consumidor al objeto de inscripción
        newInscripcion.consumidor = { id: user.id };

        // Obtener información sobre el curso
        this.cursosService.getCursoById(newInscripcion.curso).subscribe(
          (curso) => {
            // Asignar el curso al objeto de inscripción
            newInscripcion.curso = { id: curso.id };

            // Realizar la llamada al servicio de inscripciones para crear una nueva inscripción
            this.inscripcionService.newInscripcion(newInscripcion).subscribe({
              next: (data) => {
                console.log('Inscripción creada exitosamente:', data);
                this.getAllInscripciones();
                // Realizar otras acciones después de crear la inscripción si es necesario
              },
              error: (err) => {
                console.error('Error al crear la inscripción:', err);
                // Manejar errores
              },
              complete: () => {
                console.log('Create inscripción request completed');
              },
            });
          },
          (error) => {
            console.error('Error al obtener información del curso:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener información del consumidor:', error);
      }
    );
  }


  suscribirseDeNuevo() {
    const inscripcionId = this.inscripcionById.id;
    const updatedInscripcionData = this.inscripcionForm.value;

    this.inscripcionService.suscribirseDeNuevo(inscripcionId, updatedInscripcionData).subscribe({
      next:(value)=>{
        this.getAllInscripciones();
      },error(err) {
          
      },complete() {
          
      },
    })
  }

  anularInscripcion() {
    const inscripcionId = this.inscripcionById.id;
    this.inscripcionService.cancelInscripcion(inscripcionId).subscribe({
      next:(value)=> {
          this.getAllInscripciones();
      },error(err) {
          
      },complete() {
          
      },
    })

  }
  getAllUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (value) => {
        this.users = value;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
      complete: () => {
      },
    });
  }

  getAllInscripciones() {
    this.inscripcionService.getAllInscripciones().subscribe({
      next: (value) => {
        this.inscripciones = value;
      },
      error(err) {

      },
      complete() {

      },
    })
  }
 
  getInscripcionByIdForSuscribirseDeNuevo(id: number) { 
    this.inscripcionService.getInscripcionById(id).subscribe({
      next:(value) => {
        this.inscripcionById = value;
        this.setActionType('update');
      },error(err) {
          
      },complete() {
          
      },
    })
  }

  getInscripcionByIdForDelete(id: number) {
    this.inscripcionService.getInscripcionById(id).subscribe({
      next:(value)=> {
        this.inscripcionById = value;
        this.setActionType('delete');
      },
      error(err) {
          
      },
      complete() {
          
      },
    })
   }

  initForm(inscripcion: inscripcion): FormGroup {
    return this.fb.group({
      consumidor: [inscripcion?.consumidor.id || '', [Validators.required]],
      curso: [inscripcion?.curso.id || '', [Validators.required]],
    });
  }

  cleanInputs() {
    this.inscripcionForm.reset();
    this.setActionType('create');
    this.enableInputs();
  }
  enableInputs() {
    this.readonlyFields = {
      consumidor: false,
      curso: false,
    };
  }
  desableInputs() {
    this.readonlyFields = {
      consumidor: true,
      curso: true,
    };
  }
}


