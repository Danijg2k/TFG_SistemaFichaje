// Angular base
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Ng-Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Material Angular
import { MaterialExampleModule } from '../material.module';
// Cookies
import { CookieService } from 'ngx-cookie-service';
// Components / services
import { AppComponent } from './app.component';
import { AppRoutingModule } from './components/app-routing-module/app-routing.module';
import { AppRoutingModuleComponent } from './components/app-routing-module/app-routing-module.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './pages/main/main.component';
import { CookieHandlerService } from './services/cookie-handler.service';
import { AccountComponent } from './components/account/account.component';
import { EmpleadoService } from './services/empleado.service';
import { TokenHandlerService } from './services/token-handler.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NuevoEmpleadoComponent } from './components/nuevo-empleado/nuevo-empleado.component';
import { HelperActiveService } from './services/helpers/helper-active';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingModuleComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    AccountComponent,
    NotFoundComponent,
    EmpleadosComponent,
    CalendarioComponent,
    OverviewComponent,
    NuevoEmpleadoComponent,
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
  providers: [
    LoginService,
    CookieService,
    CookieHandlerService,
    TokenHandlerService,
    EmpleadoService,
    HelperActiveService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
