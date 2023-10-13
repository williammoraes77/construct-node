//Sinaleiro RUA A
int vermelho = 10;
int amarelo = 9;
int verde = 8;
int vermelhoP = 12;
int verdeP = 11;
int vermelho2 = 4;
int amarelo2 = 5;
int verde2 = 6;
int buzzer = 13;
const int buttonPin = 3;
bool botaoEstaApertado = false;

int buttonState = 0;

void setup() { 

  Serial.begin(9600);
  
  pinMode(vermelho, OUTPUT);
  pinMode(amarelo, OUTPUT);
  pinMode(verde, OUTPUT);
  pinMode(vermelhoP, OUTPUT);
  pinMode(verdeP, OUTPUT);
  pinMode(vermelho2, OUTPUT);
  pinMode(amarelo2, OUTPUT);
  pinMode(verde2, OUTPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  
  int buttonState = digitalRead(buttonPin);
  
  if (buttonState == HIGH) {
    
    digitalWrite(verdeP, HIGH);
    digitalWrite(vermelhoP, LOW);
    tone(buzzer,329);  
  } else {
    
    digitalWrite(verdeP, LOW);
    digitalWrite(vermelhoP, HIGH);
    noTone(buzzer);
  }

  
  digitalWrite(vermelho, LOW);
  digitalWrite(amarelo, LOW);
  digitalWrite(verde, HIGH);
    digitalWrite(vermelho2, HIGH);
    digitalWrite(amarelo2, LOW);
    digitalWrite(verde2, LOW);
  		digitalWrite(vermelhoP, HIGH);
    	digitalWrite(verdeP, LOW);
           if(digitalRead(verdeP) == LOW){
          	noTone(buzzer);
          }
 		
  delay(3000);

  digitalWrite(vermelho, LOW);
  digitalWrite(amarelo, HIGH);
  digitalWrite(verde, LOW);
    digitalWrite(vermelho2, HIGH);
    digitalWrite(amarelo2, LOW);
    digitalWrite(verde2, LOW);
  		digitalWrite(vermelhoP, HIGH);
    	digitalWrite(verdeP, LOW);
 
  delay(3000);
  
  digitalWrite(vermelho, HIGH);
  digitalWrite(amarelo, LOW);
  digitalWrite(verde, LOW);
    digitalWrite(vermelho2, LOW);
    digitalWrite(amarelo2, LOW);
    digitalWrite(verde2, HIGH);
  		digitalWrite(vermelhoP, HIGH);
    	digitalWrite(verdeP, LOW);

  delay(3000);
  
  digitalWrite(vermelho, HIGH);
  digitalWrite(amarelo, LOW);
  digitalWrite(verde, LOW);
    digitalWrite(vermelho2, LOW);
    digitalWrite(amarelo2, HIGH);
    digitalWrite(verde2, LOW);
  		digitalWrite(vermelhoP, HIGH);
    	digitalWrite(verdeP, LOW);
 
  delay(3000);
    
  digitalWrite(vermelho, HIGH);
  digitalWrite(amarelo, LOW);
  digitalWrite(verde, LOW);
    digitalWrite(vermelho2, HIGH);
    digitalWrite(amarelo2, LOW);
    digitalWrite(verde2, LOW);
  		digitalWrite(vermelhoP, LOW);
    	digitalWrite(verdeP, HIGH);
          if(digitalRead(verdeP) == HIGH){
            tone(buzzer, 261);
          }
  delay(3000);
}