import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { roles } from 'src/app/model/roles/roles';
import { RolesService } from 'src/app/services/roles/roles.service';
import { TokenService } from 'src/app/services/token/token.service';
import { NgxToastService } from 'ngx-toast-notifier';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent {

  rolById!: roles;

  readonlyFields = {
    rolNombre: false,
    estado: false,
  };

  isAdmin = false;
  isCreator = false;

  rolForm!: FormGroup;

  actionType: 'create' | 'update' | 'delete' | 'see' = 'create';

  setActionType(action: 'create' | 'update' | 'delete' | 'see') {
    this.actionType = action;
  }

  rolesList: roles[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private rolesService: RolesService,
    private tokenService: TokenService,
    private ngxToastService: NgxToastService,

  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.isCreator = this.tokenService.isCreador();
    this.getAllRoles();
    this.rolForm = this.initForm(this.rolById);
  }

  deleteRol() {
    const RolId = this.rolById.id;
    this.rolesService.deleteRol(RolId).subscribe({
      next: (data) => {
        this.getAllRoles();
        this.ngxToastService.onSuccess('Success!', `El rol ${data.rolNombre} fué eliminado exitosamente`);
      },
      error: (err) => {
        this.ngxToastService.onWarning('Warning!', 'No se pudo eliminar el rol: ' + err.message);
      },
      complete() {

      },
    })
  }

  getAllRoles(): void {
    this.rolesService.getAllRoles().subscribe({
      next: (value) => {
        this.rolesList = value;
      },
      error: (err) => {
      },
      complete: () => {
      },
    });
  }

  getRolById(id: number) {
    this.rolesService.getRolById(id).subscribe({
      next: (data) => {
        this.rolById = data;
        this.rolForm.setValue({
          rolNombre: this.rolById.rolNombre,
          estado: this.rolById.estado,
        });
        this.setActionType('see');
        this.desableInputs();
      },
      error: (err) => {
        console.error('Error fetching Rol:', err);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }

  getRolByIdForUpdate(id: number) {
    this.rolesService.getRolById(id).subscribe({
      next: (data) => {
        this.rolById = data;
        this.rolForm.setValue({
          rolNombre: this.rolById.rolNombre,
          estado: this.rolById.estado,
        });
        this.setActionType('update');
        this.readonlyFields = {
          rolNombre: true,
          estado: false,
        };
      },
      error: (err) => {
        console.error('Error fetching Rol:', err);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }

  getRolByIdForDelete(id: number) {
    this.rolesService.getRolById(id).subscribe({
      next: (data) => {
        this.rolById = data;
        this.setActionType('delete');
      },
      error: (err) => {
        console.error('Error fetching Rol:', err);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }

  saveRol() {
    const newRol = this.rolForm.value;
    console.log(newRol)
    newRol.roles = newRol.roles || [];
    console.log(newRol.roles);
    this.rolesService.newRol(newRol).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllRoles();
        this.rolForm.reset();
        this.ngxToastService.onSuccess('Success!', `El rol ${data.rolNombre} fué creado exitosamente`);
      },
      error: (err) => {
        this.ngxToastService.onWarning('Warning!', 'No se pudo cear el rol: ' + err.message);
      },
      complete: () => {
        console.log('Create Rol request completed');
      },
    });
  }

  updateRol() {
    const rolId = this.rolById.id;
    const updatedRolData = this.rolForm.value;
    this.rolesService.updtadeRol(rolId, updatedRolData).subscribe({
      next: (data) => {
        this.getAllRoles();
        this.rolForm.reset();
        this.ngxToastService.onSuccess('Success!', `El rol ${data.rolNombre} fué actualizado exitosamente`);
      },
      error: (err) => {
        this.ngxToastService.onWarning('Warning!', 'No se pudo actualizar el rol: ' + err.message);
      },
      complete() {

      },
    });
  }

  initForm(roles?: roles): FormGroup {
    return this.fb.group({
      rolNombre: [roles?.rolNombre || '', [Validators.required]],
      estado: [roles?.estado || '', [Validators.required]],
    });
  }

  cleanInputs(): void {
    this.rolForm.reset();
    this.setActionType('create');
    this.enableInputs();
  }

  enableInputs(): void {
    this.readonlyFields = {
      rolNombre: false,
      estado: false,
    };
  }

  desableInputs(): void {
    this.readonlyFields = {
      rolNombre: true,
      estado: true,
    };
  }

}

