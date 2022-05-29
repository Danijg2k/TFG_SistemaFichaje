import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HelperActiveService implements OnInit {
  private message = new BehaviorSubject<string>('');
  public customMessage = this.message.asObservable();

  constructor() {}

  ngOnInit(): void {}

  public changeMessage(msg: string): void {
    this.message.next(msg);
  }
}
