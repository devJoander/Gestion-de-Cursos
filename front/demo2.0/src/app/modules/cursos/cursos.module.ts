import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursoComponent } from './components/curso/curso.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CursoComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class CursosModule { }
