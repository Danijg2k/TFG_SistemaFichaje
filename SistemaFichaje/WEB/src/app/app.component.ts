import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperServiceComponent } from './components/helper-service/helper-service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'base_project';
  actualComp: string;

  editMessage: string;

  //
  constructor(private _router: Router, private helper: HelperServiceComponent) {
    this.actualComp = '';
    this.editMessage = '';
  }

  isRoute(route: string) {
    return this._router.url == route;
  }
  //

  public onRouterOutletActivate(event: any) {
    //console.log(event.constructor.name);
    this.helper.changeMessage(event.constructor.name);
  }

  // changeMessage() {
  //   this.helper.changeMessage(this.editMessage.toUpperCase());
  // }
}
