import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.model';
import { CookieHandlerService } from 'src/app/services/cookie-handler.service';
import { HelperActiveService } from 'src/app/services/helpers/helper-active';
import { TokenHandlerService } from 'src/app/services/token-handler.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // Textos mostrados / rutas / componentes mostrados (clases)
  opciones = ['Empleados', 'Calendario', 'Vista general'];
  rutas = ['/empleados', '/calendario', '/general'];
  componentes = [
    'EmpleadosComponent',
    'CalendarioComponent',
    'OverviewComponent',
  ];

  activeLink: string;
  message: string;
  empleado: Empleado | null;
  admin: boolean;

  constructor(
    private helper: HelperActiveService,
    private _token: TokenHandlerService,
    private _cookie: CookieHandlerService,
    private router: Router
  ) {
    this.message = '';
    this.activeLink = '';
    this.empleado = null;
    this.admin = false;
  }

  ngOnInit(): void {
    this._token
      .getEmpleado()
      .subscribe((x) => (this.empleado = x) && this.isAdmin());
    this.helper.customMessage.subscribe(
      (msg) => (this.message = msg) && this.checkActive()
    );
  }

  checkActive() {
    this.activeLink = this.opciones[this.componentes.indexOf(this.message)];
  }

  isAdmin() {
    if (this.empleado != null) {
      this.admin = this.empleado.rol;
    }
  }

  cerrarSesion() {
    this._cookie.closeToken();
    this.router.navigate(['']);
  }
}
