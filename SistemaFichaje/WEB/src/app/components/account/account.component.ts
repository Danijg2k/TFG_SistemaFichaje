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
  // Saving previous values
  dir: string;
  job: string;
  // Boolean used for showing/hiding "same data" when confirming message
  show: boolean;
  // JSON sent with patch
  jsonObject: JSON | null;

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
    this.dir = '';
    this.job = '';
    this.show = false;
    this.jsonObject = null;
  }

  ngOnInit(): void {
    this._token
      .getEmpleado()
      .subscribe((x) => (this.empleado = x) && this.loadData());
  }

  loadData() {
    // Saving field values for checking if there are changes
    if (this.empleado != null) {
      this.dir = this.empleado.direccion;
      this.job = this.empleado.puesto;
    }
    // Initializing form
    this.accountForm = this.fb.group({
      Id: [this.empleado?.id],
      Nombre: [this.empleado?.nombre],
      Edad: [this.empleado?.edad],
      Direccion: [this.empleado?.direccion, Validators.required],
      Puesto: [this.empleado?.puesto, Validators.required],
      Dni: [this.empleado?.dni],
      Email: [this.empleado?.correo],
      Rol: [this.empleado?.rol ? 'Admin' : 'Usuario'],
    });
  }

  applyChanges() {
    // Lo pasamos en formato JSON
    if (this.empleado != null) {
      let sameDir: boolean =
        this.accountForm.value.Direccion == this.empleado.direccion;
      let sameJob: boolean =
        this.accountForm.value.Puesto == this.empleado.puesto;

      if (sameDir && sameJob) {
        // No changes -> warning that there aren't changes made
        this.show = true;
      } else {
        var newDataJson = [];
        // Apply changes and patch to DDBB
        let arrayData: any = [];
        if (!sameDir) {
          newDataJson.push({
            op: 'replace',
            path: '/Direccion',
            value: this.accountForm.value.Direccion,
          });
        }
        if (!sameJob) {
          newDataJson.push({
            op: 'replace',
            path: '/Puesto',
            value: this.accountForm.value.Puesto,
          });
        }
        this._empleado.modifyEmpleadoData(newDataJson, 1).subscribe();
        window.location.reload();
      }
    }
  }
}
