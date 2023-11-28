import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { roles } from 'src/app/models/roles/roles';
import { environment } from 'src/assets/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  rolUri = environment.rolUri;
  
  constructor(private httpClient: HttpClient) { }

  public getAllRoles(): Observable<roles[]> {
    return this.httpClient.get<roles[]>(this.rolUri + 'all');
  }
}
