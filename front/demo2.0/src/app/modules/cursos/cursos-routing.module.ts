import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoComponent } from './components/curso/curso.component';

const routes: Routes = [
  {
    path: 'cursos',
    children: [
      { path: 'list', component: CursoComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
