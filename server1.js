const SerialPort = require("serialport"); //é usado para a comunicação com a porta serial do Arduino
const WebSocket = require("ws"); //Lib para cria servidor Websocket que permite a comunicaçao bilateral
const express = require("express"); //Lib parab riar um servidor web
const http = require("http"); //Lib para Cria um servidor http, para fazer a comunicaçao inicial e nao ser bloqueado por CORS (sistema de segurança web)

//Aqui estamos criando um servidor web
const app = express();
const server = http.createServer(app);
//
const wss = new WebSocket.Server({ server });

// Configuração da porta serial
const serialPort = new SerialPort("/dev/cu.usbmodem142101", {
  baudRate: 9600, // A mesma taxa de transmissão definida no Arduino
});

// Quando uma conexão WebSocket é estabelecida
wss.on("connection", (ws) => {
  console.log("Cliente WebSocket conectado");

  // Envia os dados da porta serial para o cliente WebSocket
  serialPort.on("data", (data) => {
    ws.send(data.toString());
  });

  // Quando o cliente WebSocket fecha a conexão
  ws.on("close", () => {
    console.log("Cliente WebSocket desconectado");
  });
});

// Inicializa o servidor
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor WebSocket rodando em http://localhost:${port}`);
});
