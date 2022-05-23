import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieHandlerService } from '../cookie-handler.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private _cookie: CookieHandlerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._cookie.getCookie();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this._cookie.closeToken();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
