import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { roles } from 'src/app/model/roles/roles';
import { environment } from 'src/assets/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  rolUri = environment.rolUri;
  
  constructor(private httpClient: HttpClient) { }

  public getAllRoles(): Observable<roles[]> {
    return this.httpClient.get<roles[]>(this.rolUri + 'all');
  }

  public getRolById(id: number): Observable<roles> {
    return this.httpClient.get<roles>(this.rolUri + `${id}`);
  }

  public newRol(rol: roles): Observable<roles>{
    return this.httpClient.post<roles>(this.rolUri + 'create', rol);
  }
  
  public updtadeRol(id: number, rol: roles): Observable<roles>{
    return this.httpClient.put<roles>(this.rolUri + `update/${id}`, rol);
  }

  public deleteRol(id: number): Observable<roles>{
    return this.httpClient.delete<roles>(this.rolUri + `delete/${id}`);
  }
}