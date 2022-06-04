// Librerías
#include <SPI.h>
#include <MFRC522.h>
 
// Pines SPI
#define RST_PIN 9
#define SS_PIN 10


 
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
  Serial.begin(9600);
  while (!Serial);      // Bucle que no permite continuar hasta que no se ha abierto el monitor serie
  SPI.begin();          // Iniciar bus SPI
  mfrc522.PCD_Init();   // Iniciar lector RFID RC522

  Serial.println("Acerca para mostrar información de la tarjeta ");
}
 
 
void loop() {
  
  // Si no hay una tarjeta cerca no sigue el programa
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }
 
  // Si hay una tarjeta cerca, que la eleccione
  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }
 
  // Mostrar información de la tarjeta por el monitor serie
  Serial.print(F("UID de la tarjeta:"));
  mostrarByteArray(mfrc522.uid.uidByte, mfrc522.uid.size);  // Motrar el UID
  Serial.println();
  Serial.print(F("Tipo de tarjeta: "));
  MFRC522::PICC_Type piccType = mfrc522.PICC_GetType(mfrc522.uid.sak);  //Motrar el tipo
  Serial.println(mfrc522.PICC_GetTypeName(piccType));
 

  // Obtener Id Tarjeta
  byte idTarjeta = leerId();
  Serial.print("\nId de la tarjeta: ");
  Serial.print(idTarjeta);


  // Detener el lector
  mfrc522.PICC_HaltA();
  // Detener la encriptación Crypto1
  mfrc522.PCD_StopCrypto1();
 
  Serial.println();
  Serial.println(F("Proceso finalizado. Ya puedes retirar la tarjeta del lector RFID"));

  Serial.println("\n-*-*-*-*-*-*-*-");
  Serial.println("Acerca para mostrar información de la tarjeta ");

  delay(1000);
 
  //while (true);

}

 
byte leerId()
{
  MFRC522::StatusCode estado;
  const byte tamBuffer = 18;
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
 
