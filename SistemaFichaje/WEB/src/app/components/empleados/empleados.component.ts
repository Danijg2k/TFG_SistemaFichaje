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
}
