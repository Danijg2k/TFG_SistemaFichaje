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
  }

  ngOnInit(): void {
    this.helper.customMessage.subscribe(
      (msg) => (this.message = msg) && this.checkActive()
    );
  }

  checkActive() {
    this.activeLink = this.opciones[this.componentes.indexOf(this.message)];
  }

  cerrarSesion() {
    this._cookie.closeToken();
    this.router.navigate(['']);
  }
}
