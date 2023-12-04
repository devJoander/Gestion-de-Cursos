import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './modules/home/components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/index',
    pathMatch: 'full'
  },
  {
    path: 'cursos',
    loadChildren: () => import('./modules/cursos/cursos.module').then(c => c.CursosModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(u => u.UsersModule)
  },
  {
    path: 'inscripciones',
    loadChildren: () => import('./modules/inscripciones/inscripciones.module').then(i => i.InscripcionesModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./modules/roles/roles.module').then(r => r.RolesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(a => a.HomeModule)
  },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
