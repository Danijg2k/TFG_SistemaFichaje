import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] | null;

  constructor(private _empleado: EmpleadoService) {
    this.empleados = null;
  }

  ngOnInit(): void {
    this._empleado.getEmpleadoData().subscribe((x) => (this.empleados = x));
  }
}
