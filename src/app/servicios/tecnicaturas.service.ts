import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tecnicaturas} from '../interfaces/tecnicaturas.interface';

@Injectable({
  providedIn: 'root'
})
export class TecnicaturasService {
  private url: string = 'http://localhost:3000/tecnicatura';

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Tecnicaturas[]>{
    return this.http.get<Tecnicaturas[]>(this.url);
  }
  
  public post (tecnicatura: Tecnicaturas): Observable<any>{
    return this.http.post(this.url, tecnicatura,{ responseType: 'text'});
  }
  public put (tecnicatura: Tecnicaturas): Observable<any>{
    return this.http.put(this.url, tecnicatura,{ responseType: 'text'});
  }
  
  public delete(tecnicatura: Tecnicaturas): Observable<any>{
    return this.http.delete(`${this.url}/${tecnicatura.idtecnicatura}`, {responseType: 'text'});
    
  }
  }