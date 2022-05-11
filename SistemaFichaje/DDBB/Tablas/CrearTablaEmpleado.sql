USE Fichaje;

CREATE TABLE Empleado(
Id INTEGER IDENTITY(1,1),
Nombre VARCHAR(200),
Edad INTEGER,
Direccion VARCHAR(150),
Puesto VARCHAR(50),
Dni VARCHAR(9) UNIQUE,
Correo VARCHAR(100) UNIQUE,
HashPassword VARCHAR(MAX),
Rol BIT,
CONSTRAINT Pk_Empleado PRIMARY KEY(Id)
);