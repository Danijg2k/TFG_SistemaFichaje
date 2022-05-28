import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  email: string;

  constructor() {
    this.email = 'danijg2000@gmail.com';
  }

  ngOnInit(): void {}
}
