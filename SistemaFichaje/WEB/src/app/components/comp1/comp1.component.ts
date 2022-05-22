import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css'],
})
export class Comp1Component implements OnInit {
  empleados: Empleado[] | null;

  constructor(private _empleado: EmpleadoService) {
    this.empleados = null;
  }

  ngOnInit(): void {
    this._empleado.getEmpleadoData().subscribe((x) => (this.empleados = x));
  }
}
