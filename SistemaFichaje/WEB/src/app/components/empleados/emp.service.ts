/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, OnInit, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Empleado } from 'src/app/models/empleado.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumnEmp, SortDirectionEmp } from './sortable.directive';
import { EmpleadoService } from 'src/app/services/empleado.service';

interface SearchResult {
  empleados: Empleado[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumnEmp;
  sortDirection: SortDirectionEmp;
}

const compare = (
  v1: string | number | boolean,
  v2: string | number | boolean
) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(
  empleados: Empleado[],
  column: SortColumnEmp,
  direction: string
): Empleado[] {
  if (direction === '' || column === '') {
    return empleados;
  } else {
    return [...empleados].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(empleado: Empleado, term: string, pipe: PipeTransform) {
  return (
    empleado.nombre.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(empleado.edad).includes(term) ||
    empleado.direccion.toLowerCase().includes(term.toLowerCase()) ||
    empleado.puesto.toLowerCase().includes(term.toLowerCase()) ||
    empleado.dni.toLowerCase().includes(term.toLowerCase()) ||
    empleado.correo.toLowerCase().includes(term.toLowerCase())
    //empleado.rol.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({ providedIn: 'root' })
export class EmpService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _empleados$ = new BehaviorSubject<Empleado[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  private EMPLEADOS: Empleado[] = [];

  constructor(private pipe: DecimalPipe, private _emps: EmpleadoService) {
    this._emps.getEmpleadoData().subscribe((x) => (this.EMPLEADOS = x));

    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._empleados$.next(result.empleados);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get empleados$() {
    return this._empleados$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumnEmp) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirectionEmp) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let empleados = sort(this.EMPLEADOS, sortColumn, sortDirection);

    // 2. filter
    empleados = empleados.filter((empleado) =>
      matches(empleado, searchTerm, this.pipe)
    );
    const total = empleados.length;

    // 3. paginate
    empleados = empleados.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ empleados, total });
  }
}
