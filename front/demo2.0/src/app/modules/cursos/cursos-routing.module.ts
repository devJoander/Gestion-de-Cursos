import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoComponent } from './components/curso/curso.component';
import { LoginGuard as AuthGuard } from 'src/app/services/guard/login.guard';
import { NotfoundComponent } from '../home/components/notfound/notfound.component';
import { SubscursosComponent } from './components/subscursos/subscursos.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { expectedRol: ['admin', 'user', 'creador'] }, 
    children: [
      { path: 'list', component: CursoComponent }
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    data: { expectedRol: ['admin', 'user', 'creador'] }, 
    children: [
      { path: 'subs/:id', component: SubscursosComponent }
    ]
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
