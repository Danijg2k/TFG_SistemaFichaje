import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  postLoginData(login: any): Observable<any> {
    return this.http.post(environment.API_URL + 'api/login', login);
  }

  public setCookie(token: string) {
    this.cookie.set('X-Token', token);
  }

  public getCookie() {
    return this.cookie.get('X-Token');
  }

  public closeToken() {
    this.cookie.delete('X-Token');
  }
}
