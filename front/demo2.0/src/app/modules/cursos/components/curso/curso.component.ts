import { Component } from '@angular/core';
import { curso } from 'src/app/model/cursos/curso';
import { user } from 'src/app/model/user/user';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inscripcion } from 'src/app/model/inscripcion/inscripcion';
import { InscripcionService } from 'src/app/services/inscripciones/inscripcion.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})

export class CursoComponent {

  cursoById!: curso;

  inscripcion!: inscripcion;

  cursos: curso[] = [];

  readonlyFields = {
    nombre: false,
    estado: false,
    creador: false,
  };

  isAdmin = false;
  isCreator = false;

  cursoForm!: FormGroup;

  users: user[] = [];

  actionType: 'create' | 'update' | 'delete' | 'see' = 'create';

  setActionType(action: 'create' | 'update' | 'delete' | 'see') {
    this.actionType = action;
  }
  constructor(
    private cursosService: CursosService,
    private readonly fb: FormBuilder,
    private usersService: UsersService,
    private inscripcionService: InscripcionService,
    private tokenService: TokenService,

  ) {

  }

  ngOnInit(): void {
    this.getAllCursos();
    this.isAdmin = this.tokenService.isAdmin();
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
        // this.toastr.success('Curso Eliminado', 'OK', {
        //   timeOut: 2000, positionClass: 'toast-top-center'
        // });
        this.getAllCursos();
      },
      error: (err) => {
        // this.toastr.error(err.error.mensaje, 'Fail', {
        //   timeOut: 2000, positionClass: 'toast-top-center',
        // });
        console.error('Error fetching curso:', err);
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

  saveCurso() {
    const newCurso = this.cursoForm.value;

    this.usersService.getUserById(newCurso.creador).subscribe(
      (user) => {
        newCurso.creador = { id: user.id };
        this.cursosService.newCurso(newCurso).subscribe({
          next: (data) => {
            console.log('Curso creado exitosamente:', data);
            // this.toastr.success('Curso Creado', 'OK', {
            //   timeOut: 2000,
            //   positionClass: 'toast-top-center'
            // });
            this.getAllCursos();
          },
          error: (err) => {
            console.error('Error al crear el curso:', err);
            // this.toastr.error(err.error.mensaje, 'Fail', {
            //   timeOut: 2000,
            //   positionClass: 'toast-top-center',
            // });
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
    
    this.cursosService.updtadeCurso(cursoId, updatedCursoData).subscribe(
      (data) => {
        this.getAllCursos();
        // this.toastr.success('Curso actualizado con éxito', 'OK', {
        //   timeOut: 2000,
        //   positionClass: 'toast-top-center'
        // });
      },
      (err) => {
   
        // this.toastr.error(err.error.mensaje, 'Fail', {
        //   timeOut: 2000,
        //   positionClass: 'toast-top-center',
        // });
      },
      () => {
    //  this.handleComplete();
      }
    );
  }


  initForm(curso?: curso): FormGroup  {
    return this.fb.group({
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