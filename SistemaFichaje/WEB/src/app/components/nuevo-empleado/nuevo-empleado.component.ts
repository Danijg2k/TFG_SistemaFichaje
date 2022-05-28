import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  }

  ngOnInit(): void {}

  createEmp() {
    if (this.newEmpForm.value.Pass != this.newEmpForm.value.PassRep) {
      this.warnMessage = 'Las contraseñas no coinciden';
      this.visible = true;
      return;
    }
    if (
      this.newEmpForm.value.Rol != 'Admin' &&
      this.newEmpForm.value.Rol != 'User'
    ) {
      this.warnMessage = 'El rol debe ser "Admin" o "User"';
      this.visible = true;
      return;
    }
    // TODO MOSTRAR EN MENSAJE SI SE HA CREADO CORRECTAMENTE (POST FUNCIONA)
    this._empleado.postEmpleadoData(this.newEmpForm.value);
    //
  }
}
