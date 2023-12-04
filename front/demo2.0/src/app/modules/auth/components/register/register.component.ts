import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/model/user/user';
import { UsersService } from 'src/app/services/users/users.service';

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

  ){}
  ngOnInit(): void {
    this.userForm = this.initForm(this.userById);
  }

  saveUser(): void {
    const newUser = this.userForm.value;
    console.log(newUser)
    this.usersService.newUser(newUser).subscribe({
      next: (data) => {
        console.log(data);
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

  initForm(user?: user): FormGroup {
    return this.fb.group({
      nombre: [user?.nombre || '', [Validators.required, Validators.minLength(3)]],
      apellido: [user?.apellido || '', [Validators.required, Validators.minLength(4)]],
      email: [user?.email || '', [Validators.required, Validators.minLength(3)]],
      password: [user?.password || '', [Validators.required, Validators.minLength(3)]],
      estado: ['A'],
    });
  }
}
