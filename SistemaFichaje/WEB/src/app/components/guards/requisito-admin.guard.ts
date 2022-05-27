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
  ): Promise<boolean> {
    // SI NO HEMOS INICIADO SESIÓN NO NOS DEJA PASAR DEL LOGIN
    return new Promise<boolean>((resolve) => {
      this._token
        .getEmpleado()
        .toPromise()
        .then((res) => {
          if (!res?.rol) {
            this.router.navigate(['/calendario']);
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(() => {
          this.router.navigate(['/calendario']);
          resolve(false);
        });
    });
  }
}
