# TFG_SistemaFichaje
Trabajo de fin de grado que consiste en un sistema de fichaje para empresas. 

Uso de las siguientes tecnologías:

*Hardware
&emsp;Tarjetas con ID grabada, representando las ID de los empleados
&emsp;Arduino UNO R3 + Lector de tarjetas RFID Rc522 -> simular fichaje, pasando la tarjeta por el lector
&emsp;Protoboard, cables y USB para realizar las conexiones
*Software
&emsp;Base de datos dockerizada Sql Server
&emsp;API en .net, para poder manipular los datos de la DDBB
&emsp;Página web realizada con Angular, para mostrar información de los fichajes en distintos formatos
&emsp;Programas utilizados por el Arduino para grabas las ID en las tarjetas, leerlas, y hacer post de las sesiones a la API
