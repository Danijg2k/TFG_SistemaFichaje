import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieHandlerService } from '../services/cookie-handler.service';
import { TokenHandlerService } from '../services/token-handler.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private _token: TokenHandlerService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Si tenemos iniciada sesión e intentamos ir al login no podemos
    // Nos va a redireccionar dentro de la página web
    // Al tener iniciada sesión no tiene mucho sentido que podamos estar en el componente de login
    if (this._token.getDecodedAccessToken() != null) {
      return this.router.navigate(['/uno']).then(() => false);
    }
    return true;
  }
}
