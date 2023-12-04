import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(
    private router: Router
  ) { }


  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY)  ?? '';
  
  }

  public isLogged() {
    if ( this.getToken()){
      return true;
    }
    return false
  }


  
  public getNombre(): string {
    if ( !this.isLogged()){
      return ''
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const nombre = values.nombre;
    return nombre;

  }
  public getId(): number {
    if ( !this.isLogged()){
      return 0;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const id = values.id;
    return id;

  }


  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public isUser(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if (roles.indexOf('ROLE_CONSUMIDOR') < 0) {
      return false;
    }
    return true;
  }
  
  public isCreador(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if (roles.indexOf('ROLE_CREADOR') < 0) {
      return false;
    }
    return true;
  }

  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/home/index']);
  }
}