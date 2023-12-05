import { Component } from '@angular/core';
import { roles } from 'src/app/model/roles/roles';
import { user } from 'src/app/model/user/user';
import { UsersService } from 'src/app/services/users/users.service';
import { FormGroup, AbstractControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { RolesService } from 'src/app/services/roles/roles.service';
import { TokenService } from 'src/app/services/token/token.service';
import { NgxToastService } from 'ngx-toast-notifier';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

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

  userForm!: FormGroup;

  actionType: 'create' | 'update' | 'delete' | 'see' = 'create';

  setActionType(action: 'create' | 'update' | 'delete' | 'see') {
    this.actionType = action;
  }

  rolesList: roles[] = [];

  isAdmin = false;
  isCreator = false;

  constructor(
    private usersService: UsersService,
    private readonly fb: FormBuilder,
    private rolesService: RolesService,
    private tokenService: TokenService,
    private ngxToastService: NgxToastService,
  ) {
  }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.isCreator = this.tokenService.isCreador();
    this.getAllUsers();
    this.userForm = this.initForm(this.userById);
    this.rolesService.getAllRoles().subscribe({
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
    this.usersService.deleteUser(userId).subscribe({
      next: (data) => {
        this.getAllUsers();
        this.ngxToastService.onSuccess('Success!', `El usuario ${data.nombre} se eliminó exitosamente`);
      },
      error: (err) => {
        this.ngxToastService.onDanger('Warning!', 'No se pudo eliminar el usuario: ' + err.message);
      },
      complete() {

      },
    })
  }

  getAllUsers(): void {
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

  getUserById(id: number) {
    this.usersService.getUserById(id).subscribe({
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
        this.setActionType('see');
        this.desableInputs();
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
    this.usersService.getUserById(id).subscribe({
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
          roles: this.userById.roles,
          //roles: rolesArray,
        });
        this.setActionType('update');
        this.enableInputs();
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
    this.usersService.getUserById(id).subscribe({
      next: (data) => {
        this.userById = data;
        this.setActionType('delete');
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
    this.usersService.newUser(newUser).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllUsers();
        this.userForm.reset();
        this.ngxToastService.onSuccess('Success!', `El usuario ${data.nombre} fué creado exitosamente`);
      },
      error: (err) => {
        this.ngxToastService.onDanger('Warning!', 'No se pudo crear el usuario: ' + err.message);
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
    this.usersService.updtadeUser(userId, updatedUserData).subscribe({
      next: (data) => {
        this.getAllUsers();
        this.userForm.reset();
        this.ngxToastService.onSuccess('Success!', `El usuario ${data.nombre} se actualizó exitosamente`);
      },
      error: (err) => {
        this.ngxToastService.onDanger('Warning!', 'No se pudo crear el usuario: ' + err.message);
      },
      complete() {

      },
    });
  }

  initForm(user?: user): FormGroup {
    return this.fb.group({
      nombre: [user?.nombre || '', [Validators.pattern('[a-zA-Z ]*') , Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellido: [user?.apellido || '', [ Validators.pattern('[a-zA-Z ]*') , Validators.required, Validators.minLength(4), Validators.maxLength(50) ]],
      email: [user?.email || '', [ Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(30), ]],
      password: [user?.password || '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)  ]],
      estado: [user?.estado || '', [Validators.required]],
      roles: [user?.roles[0]?.rolNombre || '', [Validators.required]]
    });
  }

  cleanInputs(): void {
    this.userForm.reset();
    this.setActionType('create');
    this.enableInputs();
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


  specialCharactersValidator(allowedCharacters: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value as string;

    if (!value) {
      // Si el campo está vacío, no aplicar la validación
      return null;
    }

    if (!allowedCharacters.test(value)) {
      // Si se encuentran caracteres no permitidos, devolver un error
      return { 'specialCharacters': true };
    }

    // Si no hay caracteres no permitidos, la validación pasa
    return null;
  };
}


}

