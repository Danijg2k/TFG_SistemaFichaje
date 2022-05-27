import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-helper-service',
  templateUrl: './helper-service.component.html',
  styleUrls: ['./helper-service.component.css'],
})
export class HelperServiceComponent implements OnInit {
  private message = new BehaviorSubject<string>('');
  public customMessage = this.message.asObservable();

  constructor() {}

  ngOnInit(): void {}

  public changeMessage(msg: string): void {
    this.message.next(msg);
  }
}
