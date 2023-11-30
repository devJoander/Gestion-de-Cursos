import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './components/list/list.component';
import { LayoutModule } from '../layout/layout.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

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
    // ToastrModule.forRoot(),
  ],
   
})
export class UsersModule { }
