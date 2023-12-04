import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  nombre?: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
   
      this.nombre = this.tokenService.getNombre();
   
  }

}