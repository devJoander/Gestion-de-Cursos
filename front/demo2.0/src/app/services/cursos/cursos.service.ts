import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { curso } from 'src/app/model/cursos/curso';
import { environment } from 'src/assets/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  cursosUri = environment.cursoUri;
  insUri = environment.insUri;

  constructor(private httpClient: HttpClient) { }

  public getAllCursos(): Observable<curso[]> {
    return this.httpClient.get<curso[]>(this.cursosUri + 'listar');
  }

  public getCursoById(id: number): Observable<curso> {
    return this.httpClient.get<curso>(this.cursosUri + `${id}`);
  }

  public newCurso(curso: curso): Observable<curso>{
    return this.httpClient.post<curso>(this.cursosUri + 'crear', curso);
  }
  
  public updtadeCurso(id: number, curso: curso): Observable<curso>{
    return this.httpClient.put<curso>(this.cursosUri + `update/${id}`, curso);
  }

  public deleteCurso(id: number): Observable<curso>{
    return this.httpClient.delete<curso>(this.cursosUri + `eliminar/${id}`);
  }
}

