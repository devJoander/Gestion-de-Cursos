import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InscripcionComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class InscripcionesModule { }
