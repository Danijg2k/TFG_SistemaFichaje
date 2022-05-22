export class Empleado {
  id: number;
  nombre: string;
  edad: number;
  direccion: string;
  puesto: string;
  dni: string;
  correo: string;
  hashPassword: string;
  rol: boolean;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.edad = 0;
    this.direccion = '';
    this.puesto = '';
    this.dni = '';
    this.correo = '';
    this.hashPassword = '';
    this.rol = false;
  }
}
