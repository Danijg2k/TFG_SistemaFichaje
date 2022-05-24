import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenHandlerService } from '../services/token-handler.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {
  constructor(private _token: TokenHandlerService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Nos lleva de vuelta al login si no hay token (sesión cerrada)
    // Con esto bloqueamos el acceso a la página web si no se tiene iniciada sesión
    console.log(this._token.getDecodedAccessToken());
    if (this._token.getDecodedAccessToken() == null) {
      return this.router.navigate(['']).then(() => false);
    }
    return true;
  }
}
