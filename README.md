# TFG_SistemaFichaje
Trabajo de fin de grado que consiste en un sistema de fichaje para empresas.<br/>
<br/>
Uso de las siguientes tecnologías:<br/>
<br/>
*Hardware<br/>
&emsp;Tarjetas con ID grabada, representando las ID de los empleados<br/>
&emsp;Arduino UNO R3 + Lector de tarjetas RFID Rc522 -> simular fichaje, pasando la tarjeta por el lector<br/>
&emsp;Protoboard, cables y USB para realizar las conexiones<br/>
*Software<br/>
&emsp;Base de datos dockerizada Sql Server<br/>
&emsp;API en .net, para poder manipular los datos de la DDBB<br/>
&emsp;Página web realizada con Angular, para mostrar información de los fichajes en distintos formatos<br/>
&emsp;Programas utilizados por el Arduino para grabas las ID en las tarjetas, leerlas, y hacer post de las sesiones a la API<br/>
