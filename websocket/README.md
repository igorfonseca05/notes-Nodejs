# WebSocket protocol

WebSocket é um protocolo que permite a comunicação em tempo real entre cliente e servidor através de uma conexão persistente e bidirecional. Diferente do HTTP, que precisa abrir uma nova conexão a cada requisição, o WebSocket mantém o canal aberto, o que o torna ideal para aplicações como chats, jogos online e sistemas de notificação em tempo real

# Aula 154 - Começando com sockect.io

Para podermos criar um servidor usando o socket.io, precisamos importar o pacote de dados da npm e criar um servidor usando um express na nossa maquina. Importe da npm os seguintes pacotes:

    npm i express socket.io dotenv

Agora analise e entenda o código abaixo:

```javascript
require("dotenv").config();

const express = require("express");
const { Server } = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app); // Servidor criado manualmente terceirando para o express tratar requisições
const io = new Server(server); // Indicando ao socket que o server também aceita requisições websocket

const port = 5000 || process.env.PORT;

// middlewares
app.use(express.static(path.join(__dirname, "pages"))); // Servindo arquivos estáticos

// o servidor io executa o callback sempre que um novo client
// se conectar a aplicação
io.on("connection", (socket) => {
  console.log("Nova conexão websocket");
});

server.listen(port, () => {
  console.log("Servidor on");
  console.log(`http://localhost:${port}`);
});
```

feito isso teremos um servidor preparado para receber conexões websockets, porém precisamos preparar também o cliente para que ele indique ao servidor que se conectou a aplicação. Para isso dentro do html da pagina home do cliente, faremos:

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chat Moderno</title>
  </head>

  <body></body>

  <!-- Esse script é necessário para que a conexão funcione corretamente -->
  <script src="/socket.io/socket.io.js"></script>

  <script src="js/chat.js"></script>
</html>
```

## Eventos Socket.io

Aqui vamos utilizar os eventos disponiveis no servidor io para podermos estabeler a conexão e envio de dados entre cliente e servidor. No código do servidor, podemos usar o emit no lado do client para que o servidor ouça o sinal.

**Cliente**

```js
const socket = io();

socket.emit("message", "Oi servidor!");
```

**Servidor**

```js
require("dotenv").config();

const express = require("express");
const { Server } = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 5000 || process.env.PORT;

// middlewares
app.use(express.static(path.join(__dirname, "pages")));

io.on("connection", (socket) => {
  console.log("Nova conexão websocket, id:", socket.id);

  socket.on("message", (message) => {
    console.log(message);
  });
});

server.listen(port, () => {
  console.log("Servidor on");
  console.log(`http://localhost:${port}`);
});
```

o sinal emitido pelo cliente será percebido pelo on e então a mensagem enviada será mostrada no terminal. Para fazermos o servidor responder ao cliente podemos de novo usar o método emit, só que agora dentro do servidor e configurar, de maneira muito similar o cliente, para captar a resposta.

**Servidor**

```js
io.on("connection", (socket) => {
  console.log("Nova conexão websocket, id:", socket.id);

  socket.on("message", (message) => {
    console.log(message);
  });

  socket.emit("sent", "Oi cliente!");
});
```

**Cliente**

```js
socket.on("sent", (message) => {
  console.logo(message);
});
```

A resposta enviada pelo servidor será mostrada no console do navegador.

Na solucão acima temos um pequeno problema, caso tenhamos varios clientes conectados ao servidor, somente quem enviou a mensagem será notificado e reberá os dados da mensagem, o que muitas vezes pode não ser o desejado. Caso seja esse o caso o que podemos fazer e alterar um pouco o código de modo que o servidor quando emitir uma mesagem, ela possa ser percebida e interceptada por todos os clientes conectados.

**Servidor**

```js
io.on("sent", (message) => {
  console.logo(message);
});
```

no lado do cliente não alteramos nada, assim mensagens enviadas pelo servidor serão ouvidas por todos os clientes conectados.
