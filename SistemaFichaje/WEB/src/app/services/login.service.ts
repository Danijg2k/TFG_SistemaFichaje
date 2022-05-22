import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  postLoginData<T>(login: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.post<T>(environment.API_URL + 'api/login', login, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  public getHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    return httpHeaders;
  }
}
