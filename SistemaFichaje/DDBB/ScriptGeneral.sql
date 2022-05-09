-- CON EJECUTAR ESTE SCRIPT PREPARAREMOS TODO LO NECESARIO

-- CREAR DDBB

CREATE DATABASE Fichaje;

USE Fichaje;

-- CREAR TABLA EMPLEADO

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

-- CREAR TABLA SESION

CREATE TABLE Sesion(
Id INTEGER IDENTITY(1,1),
IdEmpleado INTEGER,
Fecha DATETIME,
CONSTRAINT Pk_Sesion PRIMARY KEY(Id),
CONSTRAINT Fk_Empleado_Sesion FOREIGN KEY (IdEmpleado) REFERENCES Empleado(Id) ON UPDATE CASCADE ON DELETE CASCADE
);


-- INSERTAR EN TABLA EMPLEADO

INSERT INTO Empleado VALUES('Daniel Jiménez Gutiérrez',21,'Calle Roma','Programador Java','11222333A','djimenezg@gmail.com','hashPassword',1);
INSERT INTO Empleado VALUES('Mario Ezquerro Castillo',31,'Calle Velázquez','QA Tester','55222443F','mezquerroc@gmail.com','hashPassword',0);
INSERT INTO Empleado VALUES('Carmen López Santos',25,'Avenida Paraíso','Full Stack Developer','88555444A','clopezs@gmail.com','hashPassword',0);
INSERT INTO Empleado VALUES('Isabel Navarro Gómez',19,'Avenida Madrid','Back End Developer','77444222A','inavarrog@gmail.com','hashPassword',0);
INSERT INTO Empleado VALUES('Jorge Álvarez Gil',20,'Calle Picasso','Ingeniero DevOps','22333111A','jalvarezg@gmail.com','hashPassword',0);

-- INSERTAR EN TABLA SESION

INSERT INTO Sesion VALUES(1, DATEADD(hour,2,GETDATE()));
INSERT INTO Sesion VALUES(1, DATEADD(hour,2,GETDATE()));
INSERT INTO Sesion VALUES(2, DATEADD(hour,2,GETDATE()));
INSERT INTO Sesion VALUES(2, DATEADD(hour,2,GETDATE()));
INSERT INTO Sesion VALUES(2, DATEADD(hour,2,GETDATE()));
INSERT INTO Sesion VALUES(3, DATEADD(hour,2,GETDATE()));
INSERT INTO Sesion VALUES(4, DATEADD(hour,2,GETDATE()));
INSERT INTO Sesion VALUES(4, DATEADD(hour,2,GETDATE()));
INSERT INTO Sesion VALUES(5, DATEADD(hour,2,GETDATE()));
INSERT INTO Sesion VALUES(5, DATEADD(hour,2,GETDATE()));
