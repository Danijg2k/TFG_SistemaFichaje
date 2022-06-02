// Angular base
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DecimalPipe } from '@angular/common';
// Ng-Bootstrap
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// Material Angular
import { MaterialExampleModule } from '../material.module';
// Cookies
import { CookieService } from 'ngx-cookie-service';
// Ng Charts
import { NgChartsModule } from 'ng2-charts';
// Angular calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
// Components / services
import { AppComponent } from './app.component';
import { AppRoutingModule } from './components/app-routing-module/app-routing.module';
import { AppRoutingModuleComponent } from './components/app-routing-module/app-routing-module.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CookieHandlerService } from './services/cookie-handler.service';
import { AccountComponent } from './components/account/account.component';
import { EmpleadoService } from './services/empleado.service';
import { TokenHandlerService } from './services/token-handler.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { NuevoEmpleadoComponent } from './components/nuevo-empleado/nuevo-empleado.component';
import { HelperActiveService } from './services/helpers/helper-active';
import { EmpleadosSortableHeader } from './components/empleados/sortable.directive';
import { ChartsComponent } from './pages/charts/charts.component';
import { BarChartPuestoComponent } from './components/chart-components/bar-chart-puesto/bar-chart-puesto.component';
import { LineChartHorasPresencialesComponent } from './components/chart-components/line-chart-horas-presenciales/line-chart-horas-presenciales.component';
import { PieChartHorasMensualesComponent } from './components/chart-components/pie-chart-horas-mensuales/pie-chart-horas-mensuales.component';
import { PolarChartFichajesMensualesComponent } from './components/chart-components/polar-chart-fichajes-mensuales/polar-chart-fichajes-mensuales.component';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingModuleComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AccountComponent,
    NotFoundComponent,
    EmpleadosComponent,
    CalendarioComponent,
    NuevoEmpleadoComponent,
    EmpleadosSortableHeader,
    EmpleadosComponent,
    ChartsComponent,
    BarChartPuestoComponent,
    LineChartHorasPresencialesComponent,
    PieChartHorasMensualesComponent,
    PolarChartFichajesMensualesComponent,
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
    CommonModule,
    NgChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModalModule,
    FlatpickrModule.forRoot(),
  ],
  providers: [
    LoginService,
    CookieService,
    CookieHandlerService,
    TokenHandlerService,
    EmpleadoService,
    HelperActiveService,
    DecimalPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
