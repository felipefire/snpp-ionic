import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto} from '../interfaces/proyectos.interface';

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
}