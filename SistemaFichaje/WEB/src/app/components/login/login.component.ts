import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Empleado } from 'src/app/models/empleado.model';
import { IResponse } from 'src/app/models/iresponse';
import { Login } from 'src/app/models/login.model';
import { CookieHandlerService } from 'src/app/services/cookie-handler.service';
import { LoginService } from 'src/app/services/login.service';
import { TokenHandlerService } from 'src/app/services/token-handler.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login | null;
  empleado: Empleado | null;
  failMessage: string;
  visible: boolean;

  constructor(
    private fb: FormBuilder,
    private _login: LoginService,
    private router: Router,
    private _cookie: CookieHandlerService,
    private _token: TokenHandlerService
  ) {
    this.login = null;
    this.empleado = null;
    this.failMessage = 'Usuario/Contraseña incorrectos';
    this.visible = false;
  }

  ngOnInit(): void {
    //this._token.getEmpleado().subscribe((x) => (this.empleado = x));
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

    // TODO descomentar el refresh page cuando hay error, y quitar los console log
    this._login.postLoginData<IResponse>(login).subscribe(
      (res) => {
        if (res.body != null) {
          const token = res.body.response;
          this._cookie.setCookie(token);
          //
          // Logs para ver valores
          // console.log(this._token.getDecodedAccessToken());
          // console.log(this._token.getEmail());
          // console.log(this.empleado?.id);
          //
          this.router.navigateByUrl('/uno');
        }
      },
      (error) => {
        this.failMessage = error;
        this.visible = true;
        this.loginForm.reset();
        //window.location.reload();
      }
    );
  }
}
