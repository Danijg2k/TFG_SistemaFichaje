import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieHandlerService } from '../cookie-handler.service';
import { TokenHandlerService } from '../token-handler.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private _cookie: CookieHandlerService,
    private router: Router,
    private _token: TokenHandlerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._cookie.getCookie();
    const email = this._token.getEmail();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'X-Login': email,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((err) => {
        // Si no encuentra token (se ha agotado o modificado) lo borramos y mandamos inmediatamente al login
        // Podríamos no mandar al login, ya que los guard se encargarían de enviarnos la próxima vez que se cargue la página
        // Pero de esta forma veríamos una vez la página sin datos, y no queda del todo bien
        if (err.status === 401) {
          this._cookie.closeToken();
          this.router.navigate(['']).then(() => false);
        }
        if (err.status === 0) {
          return throwError('Servicio no disponible');
        }
        const error = err.error || err.statusText;
        return throwError(error);
      })
    );
  }
}
