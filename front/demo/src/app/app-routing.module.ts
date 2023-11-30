import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./users/users.module').then(u => u.UsersModule)
  },
  {
    path: 'a',
    loadChildren: () => import('./cursos/cursos.module').then(c => c.CursosModule)
  },

  {
    path: '*',
    redirectTo: 'users/list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
