import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './components/list/list.component';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [
    ListComponent,
 
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    LayoutModule,
  ]
})
export class UsersModule { }
