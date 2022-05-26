import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  opciones = ['Primer componente', 'Segundo componente', 'Tercer componente'];
  rutas = ['/uno', '/dos', '/tres'];
  activeLink = this.opciones[0];

  constructor() {}

  ngOnInit(): void {}
}
