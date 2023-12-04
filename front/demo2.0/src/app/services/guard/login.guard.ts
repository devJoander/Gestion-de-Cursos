import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../token/token.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  rol!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    this.rol = this.tokenService.isAdmin() ? 'admin' : (this.tokenService.isCreador() ? 'creador' : 'user');
    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.rol) < 0) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}