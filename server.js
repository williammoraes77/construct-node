const WebSocketServer = require("websocket").server;
const http = require("http");

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("/dev/cu.usbmodem142101", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

port.on("open", function () {
  console.log("Conexão com a porta serial estabelecida");
});

// const port = new SerialPort("/dev/cu.usbmodem142101", { baudRate: 9600 });
// Crie um servidor HTTP
const server = http.createServer(function (request, response) {
  console.log("Recebida requisição HTTP.");
});
server.listen(8080, function () {
  console.log("Servidor WebSocket está ouvindo na porta 8080.");
});

// Crie o servidor WebSocket
const wsServer = new WebSocketServer({
  httpServer: server,
});

// Lógica para manipular as conexões WebSocket
wsServer.on("request", function (request) {
  // const connection = request.accept(null, request.origin);
  // console.log("Nova conexão WebSocket estabelecida.");

  // Manipule as mensagens recebidas
  // connection.on("message", function (message) {
  //   if (message.type === "utf8") {
  //     console.log("Mensagem recebida: " + message.utf8Data);

  //     // Envie uma resposta para o cliente (opcional)
  //     connection.sendUTF("Mensagem recebida: " + message.utf8Data);

  //     // Lógica adicional para enviar os dados para o Arduino
  //     // Aqui você pode chamar a função para enviar os dados pela porta serial para o Arduino
  //   }
  // });

  // function enviarMensagemParaArduino(mensagem) {
  //   port.write(mensagem, function (err) {
  //     if (err) {
  //       console.log("Erro ao enviar mensagem para o Arduino:", err);
  //     } else {
  //       console.log("Mensagem enviada para o Arduino:", mensagem);
  //     }
  //   });
  // }

  // // No manipulador de mensagens recebidas do WebSocket
  // connection.on("message", function (message) {
  //   if (message.type === "utf8") {
  //     console.log("Mensagem recebida:", message.utf8Data);

  //     // Envie a mensagem para o Arduino
  //     enviarMensagemParaArduino(message.utf8Data);

  //     // Resto do código...
  //   }
  // });

  const connection = request.accept(null, request.origin);
  console.log("Nova conexão WebSocket estabelecida.");

  // Resto do código...

  // Lógica para receber dados do Arduino via porta serial
  parser.on("data", function (data) {
    // Enviar os dados para o Construct 3 via WebSocket
    console.log(data);
    connection.sendUTF(data);
  });

  // Manipule o fechamento da conexão
  connection.on("close", function () {
    console.log("Conexão WebSocket fechada.");
  });
});
