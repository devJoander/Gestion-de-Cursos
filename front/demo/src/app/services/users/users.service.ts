import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environment/environment';
import { user } from 'src/app/models/users/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  usuarioURL = environment.usuarioURL;
  authURL = environment.authURL;
  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<user[]> {
    return this.httpClient.get<user[]>(this.usuarioURL + 'todos');
  }
}
