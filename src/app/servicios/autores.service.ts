import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autores } from '../interfaces/autores.interface';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  url: string = "http://localhost:3000/autor";

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Autores[]>{
    return this.http.get<Autores[]>(this.url);
  }

  public post (autor: Autores): Observable<any>{
    return this.http.post(this.url, autor,{ responseType: 'text'});
  }
  public put (autor: Autores): Observable<any>{
    return this.http.put(this.url, autor,{ responseType: 'text'});
  }

  public delete(autor: Autores): Observable<any>{
    return this.http.delete(`${this.url}/${autor.idAutores}`, {responseType: 'text'});
    
  }
}