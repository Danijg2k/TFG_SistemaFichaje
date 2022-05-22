import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { Comp1Component } from '../comp1/comp1.component';
import { Comp2Component } from '../comp2/comp2.component';
import { Comp3Component } from '../comp3/comp3.component';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { TokenGuard } from '../token.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'uno',
    canActivate: [TokenGuard],
    component: Comp1Component,
  },
  {
    path: 'dos',
    canActivate: [TokenGuard],
    component: Comp2Component,
  },
  {
    path: 'tres',
    canActivate: [TokenGuard],
    component: Comp3Component,
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
