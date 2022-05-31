import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { CalendarioComponent } from '../calendario/calendario.component';
import { EmpleadosComponent } from '../empleados/empleados.component';
import { LoginGuard } from '../../services/guards/login.guard';
import { RequisitoAdminGuard } from '../../services/guards/requisito-admin.guard';
import { TokenGuard } from '../../services/guards/token.guard';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { NuevoEmpleadoComponent } from '../nuevo-empleado/nuevo-empleado.component';
import { OverviewComponent } from '../overview/overview.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  // Propias del Admin
  {
    path: 'empleados',
    // canActivate: [TokenGuard, RequisitoAdminGuard],
    component: EmpleadosComponent,
  },
  {
    path: 'nuevaCuenta',
    // canActivate: [TokenGuard, RequisitoAdminGuard],
    component: NuevoEmpleadoComponent,
  },
  // Todos los usuarios
  {
    path: 'calendario',
    canActivate: [TokenGuard],
    component: CalendarioComponent,
  },
  {
    path: 'general',
    canActivate: [TokenGuard],
    component: OverviewComponent,
  },
  {
    path: 'account',
    // canActivate: [TokenGuard],
    component: AccountComponent,
  },
  // Not found pages
  {
    path: 'notFound',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/notFound',
  },
  //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
