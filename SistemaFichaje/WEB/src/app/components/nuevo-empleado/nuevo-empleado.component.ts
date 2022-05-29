import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado.model';
import { IResponse } from 'src/app/models/iresponse';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css'],
})
export class NuevoEmpleadoComponent implements OnInit {
  newEmpForm: FormGroup;
  show: boolean;
  hidePass: boolean;
  hideRepeat: boolean;
  visible: boolean;
  warnMessage: string;
  empleado: Empleado | null;

  constructor(private _empleado: EmpleadoService, private fb: FormBuilder) {
    this.newEmpForm = this.fb.group({
      Nombre: ['', Validators.required],
      Edad: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(16),
          Validators.max(67),
        ]),
      ],
      Direccion: ['', Validators.required],
      Puesto: ['', Validators.required],
      Dni: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(9)]),
      ],
      Email: ['', Validators.required],
      Rol: ['', Validators.required],
      Pass: ['', Validators.required],
      PassRep: ['', Validators.required],
    });
    this.show = false;
    this.hidePass = true;
    this.hideRepeat = true;
    this.visible = false;
    this.warnMessage = '';
    this.empleado = null;
  }

  ngOnInit(): void {}

  createEmp() {
    // Contraseñas iguales
    if (this.newEmpForm.value.Pass != this.newEmpForm.value.PassRep) {
      this.warnMessage = 'Las contraseñas no coinciden';
      this.visible = true;
      return;
    }
    // Admin o User
    if (
      this.newEmpForm.value.Rol != 'Admin' &&
      this.newEmpForm.value.Rol != 'User'
    ) {
      this.warnMessage = 'El rol debe ser "Admin" o "User"';
      this.visible = true;
      return;
    }

    this._empleado.postEmpleadoData<IResponse>(this.newEmpForm.value).subscribe(
      (res) => {
        // Si se ha creado el empleado/cuenta correctamente
        if (res.body != null) {
          this.warnMessage = 'Cuenta añadida correctamente';
          this.visible = true;
        }
      },
      (error) => {
        // Si se ha producido error
        this.warnMessage = error;
        this.visible = true;
      }
    );
  }
}
