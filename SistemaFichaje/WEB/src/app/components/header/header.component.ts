import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.model';
import { CookieHandlerService } from 'src/app/services/cookie-handler.service';
import { TokenHandlerService } from 'src/app/services/token-handler.service';
import { HelperServiceComponent } from '../helper-service/helper-service.component';

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
  // Array usado para visibilidad
  visibles: boolean[];

  empleado: Empleado | null;
  activeLink: string;
  message: string;

  constructor(
    private helper: HelperServiceComponent,
    private _token: TokenHandlerService,
    private _cookie: CookieHandlerService,
    private router: Router
  ) {
    this.message = '';
    this.activeLink = '';
    this.visibles = [];
    this.empleado = null;
  }

  ngOnInit(): void {
    this.helper.customMessage.subscribe(
      (msg) => (this.message = msg) && this.checkActive()
    );
  }

  checkActive() {
    this.activeLink = this.opciones[this.componentes.indexOf(this.message)];
    //
    this._token.getEmpleado().subscribe((x) => (this.empleado = x));
    console.log(this.empleado?.rol);
    this.visibles = this.empleado?.rol
      ? [true, true, true]
      : [false, true, true];
    //
  }

  isVisible(pos: number): boolean {
    return this.visibles[pos];
  }

  cerrarSesion() {
    this._cookie.closeToken();
    this.router.navigate(['']);
  }
}
