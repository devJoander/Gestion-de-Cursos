import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/model/user/user';
import { UsersService } from 'src/app/services/users/users.service';
import { NgxToastService } from 'ngx-toast-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userById?: user;
  
  userForm!: FormGroup;
  constructor(
    private usersService: UsersService,
    private readonly fb: FormBuilder,
    private ngxToastService: NgxToastService,
  ){}
  ngOnInit(): void {
    this.userForm = this.initForm(this.userById);
  }

  saveUser(): void {
    const newUser = this.userForm.value;
    console.log(newUser)
    this.usersService.newUser(newUser).subscribe({
      next: (data) => {
        this.userForm.reset();
        this.ngxToastService.onSuccess('Success!', `${data.nombre} Acabas de crear una cuenta en Olimac`);
      },
      error:(err) =>{
        this.ngxToastService.onDanger('Warning!', 'No se pudo crear el usuario, el email ya existe');
      },
      complete: () => {
        console.log('Create user request completed');
      },
    });
  }

  initForm(user?: user): FormGroup {
    return this.fb.group({
      nombre: [user?.nombre || '', [Validators.pattern('[a-zA-Z ]*') , Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellido: [user?.apellido || '', [ Validators.pattern('[a-zA-Z ]*') , Validators.required, Validators.minLength(4), Validators.maxLength(50) ]],
      email: [user?.email || '', [ Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(30), ]],
      password: [user?.password || '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)  ]],
      estado: ['A'],
    });
  }
}
