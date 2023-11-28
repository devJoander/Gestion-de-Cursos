import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environment/environment';
import { user } from 'src/app/models/users/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  userUri = environment.userUri;
  authUri = environment.authUri;
  
  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<user[]> {
    return this.httpClient.get<user[]>(this.userUri + 'todos');
  }

  public getUserById(id: number): Observable<user> {
    return this.httpClient.get<user>(this.userUri + `${id}`);
  }

  public newUser(user: user): Observable<user>{
    return this.httpClient.post<user>(this.userUri + 'create', user);
  }
  
  public updtadeUser(id: number, user: user): Observable<user>{
    return this.httpClient.put<user>(this.userUri + `actualizar/${id}`, user);
  }

  public deleteUser(id: number): Observable<user>{
    return this.httpClient.delete<user>(this.userUri + `eliminar/${id}`);
  }
}
