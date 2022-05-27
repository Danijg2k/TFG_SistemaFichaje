import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { CookieHandlerService } from './cookie-handler.service';
import { EmpleadoService } from './empleado.service';
import { Empleado } from '../models/empleado.model';

@Injectable()
export class TokenHandlerService {
  constructor(
    private _cookieHandler: CookieHandlerService,
    private _empleado: EmpleadoService
  ) {}

  // HANDLE TOKEN (get params from decoded token)
  // 1. Get token content
  getDecodedAccessToken(): any {
    try {
      return jwt_decode(this._cookieHandler.getCookie());
    } catch (Error) {
      return null;
    }
  }

  // 2. Get user
  getEmail(): string {
    try {
      return this.getDecodedAccessToken()['user'];
    } catch (Error) {
      return '';
    }
  }

  // 3. Get Empleado
  getEmpleado(): Observable<Empleado> {
    return this._empleado.getUserEmpleadoData(this.getEmail());
  }

  // 4. Get Rol
  // getRol(): string {
  //   return this.getEmpleado().
  // }
}
