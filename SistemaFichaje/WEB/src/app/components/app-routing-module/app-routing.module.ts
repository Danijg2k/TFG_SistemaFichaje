import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { Comp1Component } from '../comp1/comp1.component';
import { Comp2Component } from '../comp2/comp2.component';
import { Comp3Component } from '../comp3/comp3.component';
import { ErrorComponent } from '../error/error.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'uno',
    component: Comp1Component,
  },
  {
    path: 'dos',
    component: Comp2Component,
  },
  {
    path: 'tres',
    component: Comp3Component,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
