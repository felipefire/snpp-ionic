import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Usuario} from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url: string = 'http://localhost:3000/usuario';

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }
}