import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HelperServiceComponent } from '../helper-service/helper-service.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // Lo que se muestra en los elementos del menú
  opciones = ['Empleados', 'Calendario', 'Vista general'];
  // Rutas elementos menú
  rutas = ['/empleados', '/calendario', '/general'];
  // Nombres de los componentes a los que te lleva el menú
  componentes = [
    'EmpleadosComponent',
    'CalendarioComponent',
    'OverviewComponent',
  ];
  //
  activeLink: string;
  message: string;

  constructor(private helper: HelperServiceComponent) {
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
}
