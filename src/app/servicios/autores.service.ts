import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autores } from '../interfaces/autores.interface';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  private url: string = 'http://localhost:3000/autor';

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Autores[]>{
    return this.http.get<Autores[]>(this.url);
  }
}