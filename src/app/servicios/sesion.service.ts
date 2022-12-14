import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Credenciales } from '../interfaces/credenciales.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private url: string = "http://localhost:3000/sesion";
  public token: string | null = null; 
  private timer: any;

  constructor(
    private http: HttpClient
  ) {
    Preferences.get({key: 'token'}).then(pref => {
      if(pref.value != null){
        const jwtHelper: JwtHelperService = new JwtHelperService()
        if(!jwtHelper.isTokenExpired(pref.value)){
          this.token = pref.value;
          this.procesarToken(pref.value);
        }
      }
    }).catch(e => {
      console.error('Error al cargar token desde Preferences', e);
    })
  }

  public iniciar(cred: Credenciales): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.url}/iniciar`, cred).pipe(
      tap(resp => {
        this.token = resp.token;
        Preferences.set({key: 'token', value: resp.token});
        this.procesarToken(resp.token);
      })
    );
  }
  private mantener(): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.url}/manterner`, { token: this.token });

  }

  public cerrarSesion(){
    this.token = null;
    Preferences.remove({key: 'token'});
  }

  //en vez de localStorage.get('token') se usa Preferences.get({key: 'token'}). OBS IMPORTAR ->  import { Preferences } from '@capacitor/preferences'
  private procesarToken(token: string) {
    const jwt: JwtHelperService = new JwtHelperService();
    const expiracion: Date | null = jwt.getTokenExpirationDate(token);
    if (expiracion) {
      const renovacion: Date = new Date(expiracion.getTime() - 20000);
      const ejecutarEn: number = renovacion.getTime() - Date.now();
      const timer = setTimeout(() =>
        setTimeout(() => {
          this.mantener().subscribe({
            next: (resp) => {
              console.log('Mantener sesion');
              this.token = resp.token;
              //localStorage.set('token', resp.token) -> Solo para navegadores
              Preferences.set({ // Para navegadores y APK
                key: 'token',
                value: resp.token
              })
              this.procesarToken(resp.token);
            },
            error: (e) => {
              console.error('Error al mantener Sesion', e);
            }
          })
        }, ejecutarEn));
    }
  }
}
