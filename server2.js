const WebSocketServer = require("websocket").server;
const http = require("http");

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("/dev/cu.usbmodem142101", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

port.on("open", function () {
  console.log("Conexão com a porta serial estabelecida");
});

const server = http.createServer(function (request, response) {
  console.log("Recebida requisição HTTP.");
});
server.listen(8081, function () {
  // server.listen(8081, "192.168.0.21", function () {
  console.log("Servidor WebSocket está ouvindo na porta 8081.");
});

const wsServer = new WebSocketServer({
  httpServer: server,
});

wsServer.on("request", function (request) {
  const connection = request.accept(null, request.origin);
  console.log("Nova conexão WebSocket estabelecida.");

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      console.log("Mensagem recebida: " + message.utf8Data);
      // connection.sendUTF("Mensagem recebida: " + message.utf8Data);
      connection.sendUTF(message);
      // Lógica para manipular a mensagem, se necessário
    }
    connection.sendUTF(1);
  });

  // Resto do código...
});
