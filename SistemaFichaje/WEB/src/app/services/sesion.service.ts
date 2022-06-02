import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sesion } from '../models/sesion.model';
import { CookieHandlerService } from './cookie-handler.service';

@Injectable()
export class SesionService {
  constructor(private http: HttpClient) {}

  getAllSesions(): Observable<any> {
    return this.http.get(environment.API_URL + 'sesiones', {});
  }

  getSesion(id: number): Observable<Sesion> {
    return this.http.get<Sesion>(environment.API_URL + 'sesiones/' + id);
  }
}
