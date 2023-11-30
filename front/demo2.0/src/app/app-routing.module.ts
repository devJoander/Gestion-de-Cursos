import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/cursos/cursos.module').then(u => u.CursosModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/users/users.module').then(c => c.UsersModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/inscripciones/inscripciones.module').then(c => c.InscripcionesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
