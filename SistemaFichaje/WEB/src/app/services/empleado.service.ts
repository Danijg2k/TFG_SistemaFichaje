import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../models/empleado.model';
import { CookieHandlerService } from './cookie-handler.service';

@Injectable()
export class EmpleadoService {
  constructor(
    private http: HttpClient,
    private _cookie: CookieHandlerService
  ) {}

  getEmpleadoData(): Observable<any> {
    return this.http.get(environment.API_URL + 'empleados', {});
  }

  getUserEmpleadoData(email: string): Observable<Empleado> {
    return this.http.get<Empleado>(
      environment.API_URL + 'empleados/GetByEmail/' + email
    );
  }

  modifyEmpleadoData(datosFormAccount: any, id: number): Observable<Empleado> {
    return this.http.patch<Empleado>(
      environment.API_URL + 'empleados/update/' + id,
      datosFormAccount
    );
  }

  // TODO
  postEmpleadoData<T>(body: any): Observable<HttpResponse<T>> {
    let bodyData = new Empleado();
    bodyData.nombre = body.Nombre;
    bodyData.edad = body.Edad;
    bodyData.direccion = body.Direccion;
    bodyData.puesto = body.Puesto;
    bodyData.dni = body.Dni;
    bodyData.correo = body.Email;
    // Pasamos la contraseña y la ciframos en el controller
    bodyData.hashPassword = body.Pass;
    if (body.Rol == 'Admin') {
      bodyData.rol = true;
    } else if (body.Rol == 'User') {
      bodyData.rol = false;
    }

    return this.http.post<T>(environment.API_URL + 'empleados', bodyData, {
      observe: 'response',
    });
  }
}
