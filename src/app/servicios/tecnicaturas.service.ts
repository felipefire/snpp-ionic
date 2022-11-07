import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tecnicatura} from '../interfaces/tecnicaturas.interface';

@Injectable({
  providedIn: 'root'
})
export class TecnicaturasService {
  private url: string = 'http://localhost:3000/tecnicatura';

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<Tecnicatura[]>{
    return this.http.get<Tecnicatura[]>(this.url);
  }
}