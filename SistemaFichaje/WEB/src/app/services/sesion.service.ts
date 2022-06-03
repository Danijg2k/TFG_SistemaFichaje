import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sesion } from '../models/sesion.model';
import { SesionEmp } from '../models/sesionEmp.model';
import { CookieHandlerService } from './cookie-handler.service';

@Injectable()
export class SesionService {
  constructor(private http: HttpClient) {}

  // SesionEmp of specific User (used for calendar User)
  getSesionsOfEmp(idEmp: number): Observable<SesionEmp[]> {
    return this.http.get<SesionEmp[]>(
      environment.API_URL + 'sesiones/sesionEmp/' + idEmp
    );
  }

  // All SesionEmp (used for calendar Admin)
  getSesionsEmp(): Observable<SesionEmp[]> {
    return this.http.get<SesionEmp[]>(
      environment.API_URL + 'sesiones/sesionEmp'
    );
  }
}
