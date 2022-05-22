import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TokenHandlerService } from 'src/app/services/token-handler.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  empleado: Empleado | null;

  constructor(
    private _empleado: EmpleadoService,
    private _token: TokenHandlerService
  ) {
    this.empleado = null;
  }

  ngOnInit(): void {
    this._token.getEmpleado().subscribe((x) => (this.empleado = x));
  }
}
