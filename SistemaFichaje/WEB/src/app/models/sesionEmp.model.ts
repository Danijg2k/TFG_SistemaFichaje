export class SesionEmp {
  idSesion: number;
  idEmpleado: number;
  fecha: Date;
  nombre: string;

  constructor() {
    this.idSesion = 0;
    this.idEmpleado = 0;
    this.fecha = new Date();
    this.nombre = '';
  }
}
