import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login, user } from 'src/app/model/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login!: login;

  isLogged = false;

  message?: string;
  userForm!: FormGroup;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private readonly fb: FormBuilder,
    ) { }
    
    ngOnInit() {
    this.userForm = this.initForm(this.login);
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.router.navigate(["/home/index"])
    } else {
      this.router.navigate(["/auth/login"])
    }
    console.log(this.isLogged)

  }

  onLogin() {
    this.authService.login(this.userForm.value).subscribe(
      {
        next: (value) => {
          this.tokenService.setToken(value.token);
          console.log(value)
          this.router.navigate(['/users/list']);
        },
        error(err) {

        },
        complete() {

        },
      }
    );

  }
  onLogOut(): void {
    this.tokenService.logOut();
  }
  initForm(login?: login): FormGroup {
    return this.fb.group({
      email: [login?.email || '', [Validators.required, Validators.minLength(3)]],
      password: [login?.password || '', [Validators.required, Validators.minLength(3)]],
    });
  }

}


