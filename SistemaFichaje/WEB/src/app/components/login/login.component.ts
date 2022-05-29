import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.model';
import { IResponse } from 'src/app/models/iresponse';
import { Login } from 'src/app/models/login.model';
import { CookieHandlerService } from 'src/app/services/cookie-handler.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login: Login | null;
  empleado: Empleado | null;
  failMessage: string;
  visible: boolean;
  hide: boolean;

  constructor(
    private fb: FormBuilder,
    private _login: LoginService,
    private router: Router,
    private _cookie: CookieHandlerService
  ) {
    this.login = null;
    this.empleado = null;
    this.failMessage = 'Usuario/Contraseña incorrectos';
    this.visible = false;
    this.hide = true;
  }

  loginForm = this.fb.group({
    Email: ['', Validators.required],
    Pass: ['', Validators.required],
  });

  onSubmit() {
    // Lo pasamos en formato JSON
    const login = {
      usuario: this.loginForm.value.Email,
      contra: this.loginForm.value.Pass,
    };

    this._login.postLoginData<IResponse>(login).subscribe(
      (res) => {
        if (res.body != null) {
          const token = res.body.response;
          this._cookie.setCookie(token);
          this.router.navigateByUrl('/calendario');
        }
      },
      (error) => {
        this.failMessage = error;
        this.visible = true;
        this.loginForm.reset();
      }
    );
  }
}
