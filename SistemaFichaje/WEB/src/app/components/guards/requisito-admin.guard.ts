import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/models/empleado.model';
import { TokenHandlerService } from 'src/app/services/token-handler.service';

@Injectable({
  providedIn: 'root',
})
export class RequisitoAdminGuard implements CanActivate {
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
    return this._token.getEmpleado().subscribe((x) => {
      return !x.rol
        ? this.router.navigate(['/calendario']).then(() => false)
        : true;
    }) as any;
  }
}
