// const SerialPort = require("serialport");
// const express = require("express");
// const app = express();
// const port = 3000;

// // Configuração da porta serial
// const serialPort = new SerialPort("/dev/cu.usbmodem144101", {
//   baudRate: 9600, // A mesma taxa de transmissão definida no Arduino
// });

// // Configuração do servidor web
// app.get("/", (req, res) => {
//   // Configura a resposta do servidor para exibir o caractere recebido
//   serialPort.on("data", (data) => {
//     res.send(`Caractere recebido: ${data.toString()}`);
//   });
// });

// // Inicializa o servidor web
// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });

const SerialPort = require("serialport");
const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuração da porta serial
const serialPort = new SerialPort("/dev/cu.usbmodem144101", {
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
  n;
  console.log(`Servidor WebSocket rodando em http://localhost:${port}`);
});
