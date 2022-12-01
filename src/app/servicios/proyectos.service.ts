import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyectos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  url: string = "http://localhost:3000/proyecto";

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.url);
  }

  public post (proyecto: Proyecto): Observable<any>{
    return this.http.post(this.url, proyecto,{ responseType: 'text'});
  }
  public put (proyecto: Proyecto): Observable<any>{
    return this.http.put(this.url, proyecto,{ responseType: 'text'});
  }

  public delete(proyecto: Proyecto): Observable<any>{
    return this.http.delete(`${this.url}/${proyecto.idproyecto}`, {responseType: 'text'});
    
  }

  public subirArchivo(id: number, documento: any): Observable<any>{
    const formData = new FormData();
    formData.append("documento", documento);
    return this.http.post(`${this.url}/${id}/archivo`, formData);
  }
}