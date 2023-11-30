import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/app/model/user/user';
import { environment } from 'src/assets/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUri = environment.userUri;
   
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
