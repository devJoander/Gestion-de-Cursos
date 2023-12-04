import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard as AuthGuard } from 'src/app/services/guard/login.guard';
import { NotfoundComponent } from '../home/components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '',
    children: [
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
