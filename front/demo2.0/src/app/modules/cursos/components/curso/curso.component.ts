import { Component } from '@angular/core';
import { curso } from 'src/app/model/cursos/curso';
import { user } from 'src/app/model/user/user';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inscripcion } from 'src/app/model/inscripcion/inscripcion';
import { InscripcionService } from 'src/app/services/inscripciones/inscripcion.service';
import { TokenService } from 'src/app/services/token/token.service';
import { NgxToastService } from 'ngx-toast-notifier';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})

export class CursoComponent {

  cursoById!: curso;

  inscripcion!: inscripcion;

  cursos: curso[] = [];

  consumidorById?: user;

  readonlyFields = {
    nombre: false,
    estado: false,
    creador: false,
  };

  isId = false;
  isAdmin = false;
  isUser = false;
  isCreator = false;

  cursoForm!: FormGroup;

  users: user[] = [];

  actionType: 'create' | 'update' | 'delete' | 'see' | 'suscripcion' = 'create';

  setActionType(action: 'create' | 'update' | 'delete' | 'see' | 'suscripcion') {
    this.actionType = action;
  }

  constructor(
    private cursosService: CursosService,
    private readonly fb: FormBuilder,
    private usersService: UsersService,
    private inscripcionService: InscripcionService,
    private tokenService: TokenService,
    private ngxToastService: NgxToastService,
  ) {

  }

  ngOnInit(): void {
    this.getAllCursos();
    this.isAdmin = this.tokenService.isAdmin();
    this.isUser= this.tokenService.isUser();
    this.isCreator = this.tokenService.isCreador();
    console.log(this.isAdmin);
    this.cursoForm = this.initForm(this.cursoById);
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

  deleteCurso() {
    const cursoId = this.cursoById.id;
    this.cursosService.deleteCurso(cursoId).subscribe({
      next: (value) => {
        this.getAllCursos();
        this.ngxToastService.onSuccess('Success!', `El curso de ${value.nombre} fué eliminado correctamente`);
      },
      error:(err) =>{
        this.ngxToastService.onWarning('Warning!', 'No se pudo eliminar el curso: ' + err.message);
      },
      complete() {
      },
    })
  }

  getAllCursos(): void {
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

  getCursoById(id: number) {
    this.cursosService.getCursoById(id).subscribe({
      next: (data) => {
        this.cursoById = data;
        this.cursoForm.setValue({
          id: this.cursoById.id,
          nombre: this.cursoById.nombre,
          estado: this.cursoById.estado,
          creador: this.cursoById.creador.nombre,
        });
        this.setActionType('see');
        this.desableInputs();
      },
      error: (err) => {
        console.error('Error fetching curso:', err);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }

  getCursoByIdForUpdate(id: number) {
    this.cursosService.getCursoById(id).subscribe({
      next: (data) => {
        this.cursoById = data;
        this.cursoForm.setValue({
          id: this.cursoById.id,
          nombre: this.cursoById.nombre,
          estado: this.cursoById.estado,
          creador: this.cursoById.creador,
        });
        this.setActionType('update');
        this.enableInputs();
      },
      error: (err) => {
        console.error('Error fetching curso:', err);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }

  getCursoByIdForDelete(id: number) {
    this.cursosService.getCursoById(id).subscribe({
      next: (data) => {
        this.cursoById = data;
        this.setActionType('delete');
      },
      error: (err) => {
        console.error('Error fetching curso:', err);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }

  getCursoByIdSuscripcion(id: number) {
    this.cursosService.getCursoById(id).subscribe({
      next: (data) => {
        this.cursoById = data;
        this.cursoForm.setValue({
          id: this.cursoById.id,
          nombre: this.cursoById.nombre,
          estado: this.cursoById.estado,
          creador: this.cursoById.creador,
        });
        // console.log(this.cursoForm.value.id)
        this.setActionType('suscripcion');
      },
      error: (err) => {
        console.error('Error fetching curso:', err);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }

  suscripcionCurso() {

    const idSubs = this.tokenService.getId();
    console.log(idSubs)
    const idCurso = this.cursoForm.get('id')?.value;
    console.log(idCurso)

    // Crear un objeto newInscripcion y asignar los IDs
    const newInscripcion: inscripcion = {
      consumidor: {
        id: idSubs,
        estado: '',
        email: '',
        password: '',
        roles: [],
        cursosCreados: [],
        cursosInscritos: []
      },
      curso: {
        id: idCurso,
        nombre: '',
        creador: {
          id: 0,
          estado: '',
          email: '',
          password: '',
          roles: [],
          cursosCreados: [],
          cursosInscritos: []
        },
        estado: '',
        fechaCreacion: new Date,
        fechaActualizacion: new Date
      },
      id: 0,
      activo: false,
      fechaCreacion: new Date,
      fechaActualizacion: new Date
    };

    // Llamar al servicio de inscripciones para crear una nueva inscripción
    this.inscripcionService.newInscripcion(newInscripcion).subscribe({
      next: (value) => {
        this.ngxToastService.onSuccess('Success!', `Te suscribiste al curso de ${value.curso.nombre}`);
      },
      error:(err) =>{
        this.ngxToastService.onWarning('Warning!', 'No se pudo suscribir al curso: ' + err.message);
      },
      complete: () => {
      },
    });
  }

  saveCurso() {
    const newCurso = this.cursoForm.value;

    this.usersService.getUserById(newCurso.creador).subscribe(
      (user) => {
        newCurso.creador = { id: user.id };
        this.cursosService.newCurso(newCurso).subscribe({
          next: (data) => {
            console.log('Curso creado exitosamente:', data);
            this.getAllCursos();
            this.ngxToastService.onSuccess('Success!', `El curso de ${data.nombre} fué creado correctamente`);
          },
          error:(err) =>{
            this.ngxToastService.onWarning('Warning!', 'No se pudo crear el curso: ' + err.message);
          },
          complete: () => {
            console.log('Create curso request completed');
          },
        });
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  updateCurso() {
    const cursoId = this.cursoById.id;
    const updatedCursoData = this.cursoForm.value;
    updatedCursoData.roles = updatedCursoData.roles || [];

    this.cursosService.updtadeCurso(cursoId, updatedCursoData).subscribe({
      next:(value)=> {
          this.getAllCursos();
          this.ngxToastService.onSuccess('Success!', `Curso ${value.nombre} actualizado correctamente`);
        },
        error:(err) =>{
          this.ngxToastService.onWarning('Warning!', 'No se pudo actualizar el curso: ' + err.message);
        },
      complete() {
          
      },
    }
       
    );
  }

  getAllInscripcionesDeUnCurso(id: number) {
    this.cursosService.getAllInscripcionesDeCurso(id).subscribe({
      next: (data) => {
         console.log(data)
      },
      error: (err) => {
        console.error('Error fetching curso:', err);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }

  initForm(curso?: curso): FormGroup {
    return this.fb.group({
      id: [curso?.id || '',],
      nombre: [curso?.nombre || '', [Validators.required, Validators.minLength(3)]],
      estado: [curso?.estado || '', [Validators.required]],
      creador: [curso?.creador.id || '', [Validators.required]]
    });
  }

  cleanInputs(): void {
    this.cursoForm.reset();
    this.setActionType('create');
    this.enableInputs();
  }

  enableInputs(): void {
    this.readonlyFields = {
      nombre: false,
      estado: false,
      creador: false,
    };
  }

  desableInputs(): void {
    this.readonlyFields = {
      nombre: true,
      estado: true,
      creador: true,
    };
  }
}