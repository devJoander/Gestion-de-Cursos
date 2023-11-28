import { Component } from '@angular/core';
import { user } from 'src/app/models/users/user';
import { UsersService } from 'src/app/services/users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RolService } from 'src/app/services/rol/rol.service';
import { roles } from 'src/app/models/roles/roles';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {

  userById?: user;

  users: user[] = [];

  readonlyFields = {
    nombre: false,
    apellido: false,
    email: false,
    estado: false,
    password: false,
    roles: false,
  };

  roles: string[] = ["ROLE_CONSUMIDOR", "ROLE_CREADOR", "ROLE_ADMIN"];

  userForm!: FormGroup;

  isUpdateMode = false;

  rolesList: roles[] = [];
  constructor(
    private UsersService: UsersService,
    private readonly fb: FormBuilder,
    private RolesService: RolService,
  ) {

  }

  ngOnInit(): void {
    this.getAllUsers();
    this.userForm = this.initForm(this.userById);
    this.RolesService.getAllRoles().subscribe({
      next: (data) => {
        this.rolesList = data;
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      },
      complete() {
      },
    });
  }

  getAllUsers(): void {
    this.UsersService.getAllUsers().subscribe({
      next: (value) => {
        this.users = value;
      },
      error: (err) => {
      },
      complete: () => {
      },
    });
  }

  getUserById(id: number) {
    this.UsersService.getUserById(id).subscribe({
      next: (data) => {
        this.userById = data;
        this.userForm.setValue({
          nombre: this.userById.nombre,
          apellido: this.userById.apellido,
          email: this.userById.email,
          estado: this.userById.estado,
          password: this.userById.password,
          roles: this.userById.roles[0].rolNombre,
        });
        this.desableInputs();
        // this.userForm.controls['name'].setValue(this.user.nombre);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }

  saveUser() {
    this.UsersService.newUser(this.userForm.value).subscribe({
      next: (data) => {
        this.getAllUsers();
      },
      error(err) { },
      complete() { },
    })
  }

  updateUser(id: number) {
    this.UsersService.updtadeUser(id, this.userForm.value).subscribe({
      next(value) {
        console.log('Usuario actualizado:', value);
      },
      error(err) {

      },
      complete() {

      },
    })
  }

  initForm(user?: user): FormGroup {
    return this.fb.group({
      nombre: [user?.nombre || '', [Validators.required, Validators.minLength(3)]],
      apellido: [user?.apellido || '', [Validators.required, Validators.minLength(4)]],
      email: [user?.email || '', [Validators.required, Validators.minLength(3)]],
      password: [user?.password || '', [Validators.required, Validators.minLength(3)]],
      estado: [user?.estado || '', [Validators.required]],
      roles: [user?.roles[0].rolNombre || '', [Validators.required]],
    });
  }

  desableInputs(): void {
    this.readonlyFields = {
      nombre: true,
      apellido: true,
      email: true,
      estado: true,
      password: true,
      roles: true,
    };
  }
  cleanInputs(): void {
    this.userForm.reset();
  }
  enableInputs(): void {
    this.readonlyFields = {
      nombre: false,
      apellido: false,
      email: false,
      estado: false,
      password: false,
      roles: false,
    };

  }
}
