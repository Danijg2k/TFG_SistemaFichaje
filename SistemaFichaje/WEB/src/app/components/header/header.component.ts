import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  message: string;
  editMessage: string;

  constructor() {
    this.message = '';
    this.editMessage = '';
  }

  // Con esto se 'suscribe' -> queda a la espera de que customMessage cambie en el helper, y entonces message cambiará aqui.
  ngOnInit(): void {
    // this.helper.customMessage.subscribe((msg) => (this.message = msg));
  }

  // changeMessage() {
  //   this.helper.changeMessage(this.editMessage.toUpperCase());
  // }
}
