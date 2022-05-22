import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { IResponse } from 'src/app/models/iresponse';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login | null;

  constructor(
    private fb: FormBuilder,
    private _login: LoginService,
    private router: Router
  ) {
    this.login = null;
  }

  ngOnInit(): void {}

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
          this._login.setCookie(token);
        }
        this.router.navigateByUrl('/dsads');
      },
      (error) => {
        console.log(error);
        window.location.reload();
      }
    );
  }
}
