// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Ng-Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Material Angular
import { MaterialExampleModule } from '../material.module';
// Cookies
import { CookieService } from 'ngx-cookie-service';
// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './components/app-routing-module/app-routing.module';
import { AppRoutingModuleComponent } from './components/app-routing-module/app-routing-module.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { Comp1Component } from './components/comp1/comp1.component';
import { Comp2Component } from './components/comp2/comp2.component';
import { Comp3Component } from './components/comp3/comp3.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingModuleComponent,
    LoginComponent,
    FooterComponent,
    ErrorComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component,
    HeaderComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
  ],
  providers: [LoginService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
