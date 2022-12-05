import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Cohorte} from '../interfaces/cohorte.interface';

@Injectable({
  providedIn: 'root'
})
export class CohortesService {
  private url: string = 'http://localhost:3000/cohorte';

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Cohorte[]>{
    return this.http.get<Cohorte[]>(this.url);
  }

  public post (cohorte: Cohorte): Observable<any>{
    return this.http.post(this.url, cohorte,{ responseType: 'text'});
  }
  public put (cohorte: Cohorte): Observable<any>{
    return this.http.put(this.url, cohorte,{ responseType: 'text'});
  }

  public delete(cohorte: Cohorte): Observable<any>{
    return this.http.delete(`${this.url}/${cohorte.idcohorte}`, {responseType: 'text'});
    
  }
}