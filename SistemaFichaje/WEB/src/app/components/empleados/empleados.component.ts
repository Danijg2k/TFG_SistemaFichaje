import { DecimalPipe } from '@angular/common';
import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService } from 'src/app/services/empleado.service';

import { EmpService } from './emp.service';
import { EmpleadosSortableHeader, SortEventEmp } from './sortable.directive';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  empleados$: Observable<Empleado[]>;
  total$: Observable<number>;
  // Con estas dos variables podemos mostrar los filtros de x empleados
  numEmpleados: number;
  arrayNumEmpleados: number[];
  // Utilizadas para mostrar las flechas de ordenación en la cabecera de la tabla
  isDesc: boolean | null;
  field: string;
  //

  ngOnInit() {
    this._emp
      .getEmpleadoData()
      .subscribe((x) => (this.numEmpleados = x.length) && this.prepareArray());
  }

  @ViewChildren(EmpleadosSortableHeader)
  headers!: QueryList<EmpleadosSortableHeader>;

  constructor(public service: EmpService, public _emp: EmpleadoService) {
    this.empleados$ = service.empleados$;
    this.total$ = service.total$;
    this.numEmpleados = 0;
    this.arrayNumEmpleados = [];
    this.isDesc = null;
    this.field = '';
  }

  onSort({ column, direction }: SortEventEmp) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  prepareArray() {
    // Rellenamos el array desde 1 hasta numEmpleados
    this.arrayNumEmpleados = Array.from(
      { length: this.numEmpleados },
      (v, k) => k + 1
    );
  }

  changeArrow(property: string) {
    // If we click different one reset arrows
    if (this.field != property) {
      this.isDesc = null;
    }
    // Save actual field clicked
    this.field = property;
    // Change arrows, or remove
    if (this.isDesc == null) {
      this.isDesc = true;
    } else if (this.isDesc) {
      this.isDesc = false;
    } else if (!this.isDesc) {
      this.isDesc = null;
    }
  }
}
