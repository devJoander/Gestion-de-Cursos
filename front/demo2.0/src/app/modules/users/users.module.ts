import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxToastNotifierModule } from 'ngx-toast-notifier';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class UsersModule { }
