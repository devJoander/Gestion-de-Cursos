import { Component } from '@angular/core';
import { user } from 'src/app/models/users/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  users: user[] = [];

  constructor(
    private UsersService: UsersService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers(): void {
    this.UsersService.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
