import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Usuarios} from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url: string = 'http://localhost:3000/usuario';

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.url);
  }
}