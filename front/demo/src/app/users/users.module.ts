import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './components/list/list.component';
import { LayoutModule } from '../layout/layout.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    LayoutModule,   
    ReactiveFormsModule,
    FormsModule,
  ],
   
})
export class UsersModule { }
