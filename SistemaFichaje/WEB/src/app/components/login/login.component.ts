import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs';
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

  constructor(private fb: FormBuilder, private _login: LoginService) {
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
    this._login
      .postLoginData(login)
      .subscribe((data) => this._login.setCookie(data));
  }
}
