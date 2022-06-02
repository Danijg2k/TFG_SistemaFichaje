export class Sesion {
  id: number;
  idEmpleado: number;
  fecha: Date | null;

  constructor() {
    this.id = 0;
    this.idEmpleado = 0;
    this.fecha = null;
  }
}
