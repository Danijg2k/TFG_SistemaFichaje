import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../models/empleado.model';

@Injectable()
export class EmpleadoService {
  constructor(private http: HttpClient) {}

  getEmpleadoData(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(environment.API_URL + 'empleados');
  }

  getUserEmpleadoData(email: string): Observable<Empleado> {
    return this.http.get<Empleado>(
      environment.API_URL + 'empleados/GetByEmail/' + email
    );
  }

  // postEmpleadoData(body: any): Empleado {
  //   let bodyData = new Empleado();
  //   bodyData.name = body.name;
  //   bodyData.description = body.description;
  //   bodyData.image = body.image;

  //   let result = new Empleado();
  //   this.http
  //     .post<Empleado>(environment.API_URL + 'products', bodyData)
  //     .subscribe(
  //       (response) => {
  //         console.log('response received');
  //         result = response;
  //       },
  //       (error) => {
  //         console.error('error caught in component');
  //       }
  //     );
  //   return result;
  // }
}
