# TFG_SistemaFichaje
Trabajo de fin de grado que consiste en un sistema de fichaje para empresas. 

Uso de las siguientes tecnologías:

*Hardware
    Tarjetas con ID grabada, representando las ID de los empleados
    Arduino UNO R3 + Lector de tarjetas RFID Rc522 -> simular fichaje, pasando la tarjeta por el lector
    Protoboard, cables y USB para realizar las conexiones
*Software
    Base de datos dockerizada Sql Server
    API en .net, para poder manipular los datos de la DDBB
    Página web realizada con Angular, para mostrar información de los fichajes en distintos formatos
    Programas utilizados por el Arduino para grabas las ID en las tarjetas, leerlas, y hacer post de las sesiones a la API
