import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inscripcion } from 'src/app/model/inscripcion/inscripcion';
import { environment } from 'src/assets/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class InscripcionService {
  insUri = environment.insUri;
   
  constructor(private httpClient: HttpClient) { }

  public getAllInscripcionesDeUnCurso(): Observable<inscripcion[]> {
    return this.httpClient.get<inscripcion[]>(this.insUri + 'curso');
  }
  public getAllInscripciones(): Observable<inscripcion[]> {
    return this.httpClient.get<inscripcion[]>(this.insUri + 'todos');
  }
  public getInscripcionById(id: number): Observable<inscripcion> {
    return this.httpClient.get<inscripcion>(this.insUri + `${id}`);
  }

  public newInscripcion(inscripciones: inscripcion): Observable<inscripcion>{
    return this.httpClient.post<inscripcion>(this.insUri + 'suscribir', inscripciones);
  }
  
  public updtadeInscripcion(id: number, inscripciones: inscripcion): Observable<inscripcion>{
    return this.httpClient.put<inscripcion>(this.insUri + `actualizar/${id}`, inscripciones);
  }

  public cancelInscripcion(id: number): Observable<inscripcion>{
    return this.httpClient.delete<inscripcion>(this.insUri + `cancelar/${id}`);
  }
}
