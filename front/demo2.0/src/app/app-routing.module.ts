import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cursos',
    loadChildren: () => import('./modules/cursos/cursos.module').then(u => u.CursosModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(c => c.UsersModule)
  },
  {
    path: 'inscripciones',
    loadChildren: () => import('./modules/inscripciones/inscripciones.module').then(c => c.InscripcionesModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./modules/roles/roles.module').then(c => c.RolesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
