import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { login } from 'src/app/model/user/user';
import { environment } from 'src/assets/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;
  
  constructor(private httpClient: HttpClient) { }


  public login(login: login): Observable<login> {
    return this.httpClient.post<login>(this.authURL + 'login', login);
  }

  // public refresh(dto: JwtDTO): Observable<JwtDTO> {
  //   return this.httpClient.post<JwtDTO>(this.authURL + 'refresh', dto);
  // }
}
