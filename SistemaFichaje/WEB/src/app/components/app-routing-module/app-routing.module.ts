import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { Comp1Component } from '../comp1/comp1.component';
import { Comp2Component } from '../comp2/comp2.component';
import { Comp3Component } from '../comp3/comp3.component';
import { LoginGuard } from '../login.guard';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { TokenGuard } from '../token.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {
    path: 'uno',
    //canActivate: [TokenGuard] DESCOMENTAR, ESTO ES PARA PRUEBAS,
    component: Comp1Component,
  },
  {
    path: 'dos',
    //canActivate: [TokenGuard] DESCOMENTAR, ESTO ES PARA PRUEBAS,
    component: Comp2Component,
  },
  {
    path: 'tres',
    //canActivate: [TokenGuard] DESCOMENTAR, ESTO ES PARA PRUEBAS,
    component: Comp3Component,
  },
  {
    path: 'account',
    //canActivate: [TokenGuard], DESCOMENTAR, ESTO ES PARA PRUEBAS
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
