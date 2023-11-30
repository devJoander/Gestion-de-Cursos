import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';

const routes: Routes = [{
  path: 'inscripciones',
  children: [
    { path: 'list', component: InscripcionComponent }
  ]
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }
