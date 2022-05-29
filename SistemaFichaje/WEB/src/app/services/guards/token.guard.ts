import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenHandlerService } from 'src/app/services/token-handler.service';

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
    // SI NO HEMOS INICIADO SESIÓN NO NOS DEJA PASAR DEL LOGIN
    if (this._token.getDecodedAccessToken() == null) {
      return this.router.navigate(['']).then(() => false);
    }
    return true;
  }
}
