# TFG_SistemaFichaje
Trabajo de fin de grado que consiste en un sistema de fichaje para empresas.

## Tecnologías

### Hardware 
&emsp;Tarjetas con ID grabada, representando las ID de los empleados<br/>
&emsp;NodeMCU V3 + Lector de tarjetas RFID Rc522 -> simular fichaje, pasando la tarjeta por el lector<br/>
&emsp;Protoboard, jumper wires y cable USB-UART para realizar las conexiones<br/>

### Representación del sistema 
&emsp;Izquierda: NodeMCU. Derecha: lector de tarjetas RFID Rc522

&emsp;![image](https://user-images.githubusercontent.com/73346668/174064118-412265cf-0fba-4490-b60c-775d0dbca2b8.png)

&emsp;Posteriormente, se conectará el NodeMCU al ordenador, mediante el cable USB-UART

&emsp;![image](https://user-images.githubusercontent.com/73346668/174064757-04a90926-17e6-4c66-8a43-68b0d317b9f5.png)

### Software
&emsp;Base de datos dockerizada Sql Server

&emsp;![MicrosoftSQLServer](https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white)

&emsp;API en .net, para poder manipular los datos de la DDBB

&emsp;![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)

&emsp;Página web realizada con Angular, para mostrar información de los fichajes en distintos formatos

&emsp;![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)

&emsp;Programas utilizados por el Arduino para grabas las ID en las tarjetas, leerlas, y hacer post de las sesiones a la API

&emsp;![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)

## Versiones e instalación
Se mostrarán las versiones utilizadas en este proyecto. A continuación se indica lo necesario para poner en marcha el proyecto.

| Tecnología | Versión utilizada en este proyecto | Link página oficial  |
| ------------- | ------------- | ------------- |
| Docker desktop  | 4.9.0  | [Docker](https://www.docker.com/get-started/)  | 
| Imagen Docker mssql server  | 2022-latest  | [Imagen MySQL-Server](https://hub.docker.com/r/mysql/mysql-server)  | 
| API  | .NET 6  | [dotnet 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)  |
| NodeJs  | 16.15.1 LTS  | [NodeJs](https://nodejs.org/es/)  | 

Tras haber instalado todo, pasamos a inicializar página web y API.

### Poner en marcha Angular
Abrimos terminal en directorio 'WEB' y tecleamos:
```
npm install
ng serve
```

Con la primera orden se instalarán todas las dependencias necesarias para nuestro proyecto. La segunda arranca Angular.

### Poner en marcha API
Abrimos terminal en directorio 'API' y tecleamos:
```
dotnet build
dotnet run
```

La primera orden buildea el proyecto, y la segunda arranca la API.

## Información adicional/ayuda

Para más información consultar memoria del proyecto (Directorio 'Memoria' -> pdf)
