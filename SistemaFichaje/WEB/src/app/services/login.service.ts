import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  postLoginData<T>(login: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.post<T>(environment.API_URL + 'api/login', login, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  // Funciones Hardcodeadas YUPI
  public setCookie(token: string) {
    this.cookie.set('X-Token', token);
  }

  public getCookie() {
    return this.cookie.get('X-Token');
  }

  public closeToken() {
    this.cookie.delete('X-Token');
  }

  public getHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    return httpHeaders;
  }

  // getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwt_decode(token);
  //   } catch (Error) {
  //     return null;
  //   }
  // }
}
