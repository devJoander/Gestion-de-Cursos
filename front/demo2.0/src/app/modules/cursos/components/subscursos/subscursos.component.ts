import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { curso } from 'src/app/model/cursos/curso';
import { inscripcion } from 'src/app/model/inscripcion/inscripcion';
import { user } from 'src/app/model/user/user';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { InscripcionService } from 'src/app/services/inscripciones/inscripcion.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UsersService } from 'src/app/services/users/users.service';
import { NgxToastService } from 'ngx-toast-notifier';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subscursos',
  templateUrl: './subscursos.component.html',
  styleUrls: ['./subscursos.component.scss']
})
export class SubscursosComponent {

  inscripcions: inscripcion[] = [];

  constructor(
    private cursosService: CursosService,
    private readonly fb: FormBuilder,
    private usersService: UsersService,
    private inscripcionService: InscripcionService,
    private tokenService: TokenService,
    private ngxToastService: NgxToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.cursosService.getAllInscripcionesDeCurso(id).subscribe({
      next: (value) => {
        this.inscripcions = value;
        console.log(this.inscripcions)
      }, error(err) {
      },
      complete() {
      },
    }

    );
  }

  volver(): void {
    this.router.navigate(['/cursos/list']);
  }
}
