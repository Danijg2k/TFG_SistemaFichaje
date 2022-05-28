import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  accountForm: FormGroup;
  // Check if fields are editable
  canEditDireccion: boolean;
  canEditPuesto: boolean;

  constructor(
    private _empleado: EmpleadoService,
    private _token: TokenHandlerService,
    private fb: FormBuilder
  ) {
    this.empleado = null;
    this.accountForm = this.fb.group({
      Id: [],
      Nombre: [],
      Edad: [],
      Direccion: [],
      Puesto: [],
      Dni: [],
      Email: [],
      Rol: [],
    });
    this.canEditDireccion = false;
    this.canEditPuesto = false;
  }

  ngOnInit(): void {
    this._token
      .getEmpleado()
      .subscribe((x) => (this.empleado = x) && this.loadData());
  }

  loadData() {
    this.accountForm = this.fb.group({
      Id: [this.empleado?.id, Validators.required],
      Nombre: [this.empleado?.nombre, Validators.required],
      Edad: [this.empleado?.edad, Validators.required],
      Direccion: [this.empleado?.direccion, Validators.required],
      Puesto: [this.empleado?.puesto, Validators.required],
      Dni: [this.empleado?.dni, Validators.required],
      Email: [this.empleado?.correo, Validators.required],
      Rol: [this.empleado?.rol ? 'Admin' : 'Usuario', Validators.required],
    });
  }

  onSubmit() {
    // Actualizar datos del empleado
  }
}
