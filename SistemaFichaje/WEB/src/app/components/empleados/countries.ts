import { Empleado } from 'src/app/models/empleado.model';

export const EMPLEADOS: Empleado[] = [
  {
    id: 1,
    nombre: 'Dani',
    edad: 21,
    direccion: 'Calle Jaja',
    hashPassword: 'dsa',
    puesto: 'Programador Java',
    dni: '11222333C',
    correo: 'djimenezg@gmail.com',
    rol: true,
  },
  {
    id: 2,
    nombre: 'Mario',
    edad: 19,
    direccion: 'Calle Flores',
    hashPassword: 'trtrts',
    puesto: 'QA Tester',
    dni: '88999777B',
    correo: 'mezquerroc@gmail.com',
    rol: false,
  },
];
