// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Ng-Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Material Angular
import { MatTableModule } from '@angular/material/table';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './components/app-routing-module/app-routing.module';
import { AppRoutingModuleComponent } from './components/app-routing-module/app-routing-module.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, AppRoutingModuleComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
