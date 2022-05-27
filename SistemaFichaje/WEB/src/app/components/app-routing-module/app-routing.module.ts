import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { CalendarioComponent } from '../calendario/calendario.component';
import { EmpleadosComponent } from '../empleados/empleados.component';
import { LoginGuard } from '../guards/login.guard';
import { RequisitoAdminGuard } from '../guards/requisito-admin.guard';
import { TokenGuard } from '../guards/token.guard';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { OverviewComponent } from '../overview/overview.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {
    path: 'empleados',
    canActivate: [TokenGuard, RequisitoAdminGuard],
    component: EmpleadosComponent,
  },
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
    canActivate: [TokenGuard],
    component: AccountComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
