import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Empleado } from 'src/app/models/empleado.model';

import { EmpService } from './emp.service';
import { EmpleadosSortableHeader, SortEventEmp } from './sortable.directive';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent {
  empleados$: Observable<Empleado[]>;
  total$: Observable<number>;

  @ViewChildren(EmpleadosSortableHeader)
  headers!: QueryList<EmpleadosSortableHeader>;

  constructor(public service: EmpService) {
    this.empleados$ = service.empleados$;
    this.total$ = service.total$;
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
}
