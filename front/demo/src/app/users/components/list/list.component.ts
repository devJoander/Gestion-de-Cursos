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

  userById!: user;

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
  isDeleteMode = false;
  isCreateMode = false;
  showForm = false;

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
        console.log(this.rolesList)
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      },
      complete() {
      },
    });
  }

  deleteUser() {
    const userId = this.userById.id;
    this.UsersService.deleteUser(userId).subscribe({
      next: (value) => {
        this.getAllUsers();
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
      complete() {

      },
    })
  }

  getAllUsers(): void {
    this.UsersService.getAllUsers().subscribe({
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
        this.readonlyFields = {
          nombre: true,
          apellido: true,
          email: true,
          estado: true,
          password: true,
          roles: true,
        };
        this.isUpdateMode = false;
        this.isDeleteMode = false;
        this.isCreateMode = false;
        this.showForm = true;
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
  getUserByIdForUpdate(id: number) {
    this.UsersService.getUserById(id).subscribe({
      next: (data) => {
        this.userById = data;
        console.log(this.userById.roles[0].rolNombre);
        const rolesArray = this.userById.roles.map(rol => rol.rolNombre);
        this.userForm.setValue({
          nombre: this.userById.nombre,
          apellido: this.userById.apellido,
          email: this.userById.email,
          estado: this.userById.estado,
          password: this.userById.password,
          // roles: this.userById.roles[0].rolNombre,
          roles: rolesArray,
        });
        console.log('Roles Array:', rolesArray);
        this.isUpdateMode = true;
        this.isDeleteMode = false;
        this.isCreateMode = false;
        this.showForm = true;
        this.readonlyFields = {
          nombre: false,
          apellido: false,
          email: false,
          estado: false,
          password: false,
          roles: false,
        };
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

  getUserByIdForDelete(id: number) {
    this.UsersService.getUserById(id).subscribe({
      next: (data) => {
        this.userById = data;
        this.isDeleteMode = true;
        this.isCreateMode = false;
        this.isUpdateMode = false;
        this.showForm = false;
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
    const newUser = this.userForm.value;
    console.log(newUser)
    newUser.roles = newUser.roles || [];
    console.log(newUser.roles);

    this.UsersService.newUser(newUser).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllUsers();
        this.userForm.reset();
      },
      error: (err) => {
        console.error('Error creating user:', err);
      },
      complete: () => {
        console.log('Create user request completed');
      },
    });
  }


  updateUser() {
    const userId = this.userById.id;
    const updatedUserData = this.userForm.value;
    updatedUserData.roles = updatedUserData.roles || [];
    this.UsersService.updtadeUser(userId, updatedUserData).subscribe({
      next: (data) => {
        this.getAllUsers();
        this.userForm.reset();        // Limpiar el formulario después de la actualización
      },
      error(err) {

      },
      complete() {

      },
    });
  }

  initForm(user?: user): FormGroup {
    return this.fb.group({
      nombre: [user?.nombre || '', [Validators.required, Validators.minLength(3)]],
      apellido: [user?.apellido || '', [Validators.required, Validators.minLength(4)]],
      email: [user?.email || '', [Validators.required, Validators.minLength(3)]],
      password: [user?.password || '', [Validators.required, Validators.minLength(3)]],
      estado: [user?.estado || '', [Validators.required]],
      roles: this.fb.array(user?.roles || []),
    });
  }


  cleanInputs(): void {
    // this.userForm.reset();
    // this.isUpdateMode = false;
    // this.isDeleteMode = false;
    // this.isCreateMode = true;
    // this.showForm = true;
  }

}
