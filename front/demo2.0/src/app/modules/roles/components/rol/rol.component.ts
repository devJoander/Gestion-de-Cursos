import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { roles } from 'src/app/model/roles/roles';
import { RolesService } from 'src/app/services/roles/roles.service';

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

  rolForm!: FormGroup;

  actionType: 'create' | 'update' | 'delete' | 'see' = 'create';

  setActionType(action: 'create' | 'update' | 'delete' | 'see') {
    this.actionType = action;
  }

  rolesList: roles[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private rolesService: RolesService,
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.rolForm = this.initForm(this.rolById);
  }

  deleteRol() {
    const RolId = this.rolById.id;
    this.rolesService.deleteRol(RolId).subscribe({
      next: (value) => {
        this.getAllRoles();
      },
      error: (err) => {
        console.error('Error fetching Rol:', err);
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
        console.error('Error fetching Rol:', err);
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
        this.enableInputs();
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
      },
      error: (err) => {
        console.error('Error creating Rol:', err);
      },
      complete: () => {
        console.log('Create Rol request completed');
      },
    });
  }

  updateRol() {
    const RolId = this.rolById.id;
    const updatedRolData = this.rolForm.value;
    updatedRolData.roles = updatedRolData.roles || [];
    this.rolesService.updtadeRol(RolId, updatedRolData).subscribe({
      next: (data) => {
        this.getAllRoles();
        this.rolForm.reset();
      },
      error(err) {
      
      },
      complete() {

      },
    });
  }

  initForm(roles?: roles): FormGroup {
    return this.fb.group({
      rolNombre: [roles?.rolNombre || '', [Validators.required, Validators.minLength(3)]],
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

