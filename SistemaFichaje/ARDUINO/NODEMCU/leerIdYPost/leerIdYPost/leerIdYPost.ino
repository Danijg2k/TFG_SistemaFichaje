// Librerías
#include <SPI.h>
#include <MFRC522.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>


// Pines
#define RST_PIN D3
#define SS_PIN D4

#define SERVER_IP "http://192.168.43.79:5114"
#ifndef STASSID
#define STASSID "ssid"
#define STAPSK  "12345678"
// Hardcodeado (prueba)
#define ID_EMPLEADO "5"
#endif

 
// Instancia a la clase MFRC522
MFRC522 mfrc522(SS_PIN, RST_PIN);
 
// Clave de cifrado actuales
MFRC522::MIFARE_Key keyA = {keyByte: {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF}};
//MFRC522::MIFARE_Key keyB = {keyByte: {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF}};
 
 
// Datos necesarios para leer la Id
byte numBlque = 60;
byte bloqueTrailer = 63;

 
void mostrarByteArray(byte* buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}
 
void setup() {
  
  Serial.begin(115200);
  
  //while (!Serial);      // Bucle que no permite continuar hasta que no se ha abierto el monitor serie
  
  WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Conectado a dirección IP: ");
  Serial.println(WiFi.localIP());
  
  SPI.begin();          // Iniciar bus SPI
  mfrc522.PCD_Init();   // Iniciar lector RFID RC522

  Serial.println("Acerca tarjeta para fichar ");
}
 
 
void loop() {

  // wait for WiFi connection
  if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;
    

    // Si no hay una tarjeta cerca no sigue el programa
    if (!mfrc522.PICC_IsNewCardPresent()) {
      return;
    }

   
    // Si hay una tarjeta cerca, que la eleccione
    if (!mfrc522.PICC_ReadCardSerial()) {
      return;
    }

  
    // Obtener Id Tarjeta
    byte idTarjeta = leerId();
    Serial.print("\nId de la tarjeta: ");
    Serial.print(idTarjeta);
    Serial.println();

    // Detener el lector
    mfrc522.PICC_HaltA();
    // Detener la encriptación Crypto1
    mfrc522.PCD_StopCrypto1();


    // Comenzamos el POST
    Serial.print("Comenzando guardado de datos");
    Serial.println();
    //String enviar = "" + idTarjeta;
    http.begin(client, SERVER_IP "/sesiones/" + String(idTarjeta)); //HTTP
    http.addHeader("Content-Type", "application/json");
    

    //Serial.print("[HTTP] POST...\n");
    // start connection and send HTTP header and body
    int httpCode = http.POST("");

    // Si es > 0 no hay errores
    if (httpCode > 0) {
      Serial.printf("Código de petición POST HTTP: %d\n", httpCode);
      Serial.println();

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("Fichaje realizado. Ya puedes retirar la tarjeta");
        
        //Serial.println("received payload:\n<<");
        //Serial.println(payload);
        //Serial.println(">>");
      }
      } else {
        Serial.printf("Post fallido, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
  }

  delay(10);
  
   
  Serial.println("\n-*-*-*-*-*-*-*-");
  Serial.println("Acerca tarjeta para fichar ");

  delay(1000);
 
  

}

 
byte leerId()
{
  MFRC522::StatusCode estado;
  byte tamBuffer = 18;
  byte datosLectura[tamBuffer];
 
  // Comenzar comunicación cifrada con Key-A
  estado = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, bloqueTrailer, &keyA, &(mfrc522.uid));
  if (estado != MFRC522::STATUS_OK) {
    return 1;
  }
 
  // Leer bloque
  estado = mfrc522.MIFARE_Read(numBlque, datosLectura, &tamBuffer);
  if (estado != MFRC522::STATUS_OK) {
    Serial.print("MIFARE_Read() fallo: ");
    Serial.println(mfrc522.GetStatusCodeName(estado));
    return 2;
  }
 
  mostrarByteArray(datosLectura, tamBuffer);
 
  return datosLectura[0];
}
 
