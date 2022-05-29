import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';

export type SortColumnEmp = keyof Empleado | '';
export type SortDirectionEmp = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirectionEmp } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export interface SortEventEmp {
  column: SortColumnEmp;
  direction: SortDirectionEmp;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class EmpleadosSortableHeader {
  @Input() sortable: SortColumnEmp = '';
  @Input() direction: SortDirectionEmp = '';
  @Output() sort = new EventEmitter<SortEventEmp>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
