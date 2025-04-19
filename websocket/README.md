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

# Aula 155 - Eventos Socket.io

### Servidor responde à cliente

Aqui vamos utilizar os eventos disponiveis no servidor io para podermos estabeler a conexão e envio de dados entre cliente e servidor. No código do servidor, podemos usar o emit para enviar uma mensagem à um cliente que se conectou

**Servidor**

```js
io.on("connection", (socket) => {
  console.log("Nova conexão websocket, id:", socket.id);

  // O servidor enviará essa mensagem
  socket.emit("greating", "Bem a nosso chat!");
});
```

**Cliente**

```js
const socket = io();

socket.on("greating", (message) => console.log(message));
```

o sinal emitido pelo servidor será percebido pelo cliente e então a mensagem será mostrada no terminal.

### Cliente responde á servidor

Agora podemos fazer com que o cliente responda ao servidor usando os métodos do primeiro exemplo de maneira contrária, ou seja, quem envia `emit` e quem recebe `on`.

**Cliente**

```js
const socket = io();

// O cliente receberá a mensagem
socket.on("greating", (message) => console.log(message));

// O cliente enviará a mensagem
socket.emit("message", "Obrigado servidor!");
```

**Servidor**

```js
io.on("connection", (socket) => {
  console.log("Nova conexão websocket, id:", socket.id);

  // O servidor enviará essa mensagem
  socket.emit("greating", "Bem a nosso chat!");

  // O servidor receberá essa mensagem
  socket.on("message", (message) => {
    console.log(message);
  });
});
```

A resposta recebida pelo servidor será mostrada no terminal.

### Servidor responde à todos os clientes conectados

Nos exemplos acima temos a comunicação entre servidor e cliente acontecendo, ou seja o servidor e cliente estão se comunicando entre sí e somente isso. Pórem podemos também fazer com que o servidor se comunique ao mesmo tempo com todos os clientes conectados, isso pode ser útil quando criando uma sala de bate papo em grupo. Para isso fazemos:

**Servidor**

```js
io.on("connection", (socket) => {
  console.log("Nova conexão websocket, id:", socket.id);

  // O servidor enviará essa mensagem
  socket.emit("greating", "Bem a nosso chat!");

  // Emitindo mensagens globais
  io.emit("warning", "Sala de bate papo ativa!");

  // O servidor receberá essa mensagem
  socket.on("message", (message) => {
    // Enviará a mensagem para todos os clientes
    io.emit("message", message);
  });
});
```

**Cliente**

```js
const socket = io();

// O cliente receberá a mensagem
socket.on("greating", (message) => console.log(message));

socket.on("warning", (message) => console.log(message));

socket.on("message", (dados) => {
  console.log(dados);
});

// O cliente enviará a mensagem
socket.emit("message", "Obrigado servidor!");
```

no lado do cliente não alteramos nada, assim mensagens enviadas pelo servidor serão ouvidas por todos os clientes conectados.

### Servidor indica que cliente desconectou

Quando um cliente fechar a página do chat, ele será desconectado e isso será informado aos clientes online.

```js
io.on("connection", (socket) => {
  console.log("Nova conexão websocket, id:", socket.id);

  // O servidor enviará essa mensagem
  socket.emit("greating", "Bem a nosso chat!");

  // Emitindo mensagens globais
  io.emit("warning", "Sala de bate papo ativa!");

  // O servidor receberá essa mensagem
  socket.on("message", (message) => {
    // Enviará a mensagem para todos os clientes
    io.emit("message", message);
  });

  // Quando usuário sair, emite alerta para todos eles
  socket.on("disconnect", () => {
    io.emit("wargning", "Usuário saiu!");
  });
});
```

### Mostrando número de clientes conectados

Podemos mostrar ao usúario logados o número de clientes conectados

```js
io.on("connection", (socket) => {
  console.log("Nova conexão websocket, id:", socket.id);

  // O servidor enviará essa mensagem
  socket.emit("greating", "Bem a nosso chat!");

  // Emitindo mensagens globais
  io.emit("warning", "Sala de bate papo ativa!");
  io.emit("warning", `Conectados: ${io.engine.clientsCount}`); // Total de conectados

  // O servidor receberá essa mensagem
  socket.on("message", (message) => {
    // Enviará a mensagem para todos os clientes
    io.emit("message", message);
  });

  // Quando usuário sair, emite alerta para todos eles
  socket.on("disconnect", () => {
    io.emit("wargning", "Usuário saiu!");
  });
});
```

# Aula 157. Evento de Broadcasting

Quando um usuário se conecta a aplicação, podemos emitir uma mensagem para os demais conectados e que não seja enviada ao usuário que entrou. Para isso podemos fazer:

**Servidor**

```js
io.on("connection", (socket) => {
  console.log("Nova conexão websocket, id:", socket.id);

  // O servidor enviará essa mensagem
  socket.emit("greating", "Bem a nosso chat!");

  // Emitindo mensagens globais
  io.emit("warning", "Sala de bate papo ativa!");
  io.emit("warning", `Conectados: ${io.engine.clientsCount}`);

  // Emitindo broadcasting(Todos recebem exceto quem enviou)
  io.broadcast.emit("warning", "Usuário conectou");

  // O servidor receberá essa mensagem
  socket.on("message", (message) => {
    // Enviará a mensagem para todos os clientes
    io.emit("message", message);
  });

  // Quando usuário sair, emite alerta para todos eles
  socket.on("disconnect", () => {
    io.emit("wargning", "Usuário saiu!");
  });
});
```

**Cliente**

```js
const socket = io();

// O cliente receberá a mensagem
socket.on("greating", (message) => console.log(message));

socket.on("warning", (message) => console.log(message));

socket.on("message", (dados) => {
  console.log(dados);
});

// O cliente enviará a mensagem
socket.emit("message", "Obrigado servidor!");
```

# Aula 158 - Compartilhando localização

Para podermos compartilhar a localização do cliente podemos fazer:

**Cliente**

```js

// Indicar erro na tranmissão se houver
const error = (error) => console.error("Erro ao obter localização:", error),

// Aumentar precisão da localização
const accuracy = {
                enableHighAccuracy: true, // <- ESSENCIAL
                timeout: 10000,
                maximumAge: 0
            }

button.addEventListener("click", () => {
  navigator.geolocation.getCurrentLocation((position) => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    },
    error (error),
    accuracy)
    });
  });
```

**Servidor**

```js
io.on("connection", (socket) => {
  console.log("Nova conexão websocket, id:", socket.id);

  // O servidor enviará essa mensagem
  socket.emit("greating", "Bem a nosso chat!");

  // Emitindo mensagens globais
  io.emit("warning", "Sala de bate papo ativa!");
  io.emit("warning", `Conectados: ${io.engine.clientsCount}`);

  // Emitindo broadcasting(Todos recebem exceto quem enviou)
  io.broadcast.emit("warning", "Usuário conectou");

  // O servidor receberá essa mensagem
  socket.on("message", (message) => {
    // Enviará a mensagem para todos os clientes
    io.emit("message", message);
  });

  // Todos os usúarios receberam um link com a localização
  socket.on("sendLocation", (coords) => {
    io.emit(
      "message",
      `http://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
  });

  // Quando usuário sair, emite alerta para todos eles
  socket.on("disconnect", () => {
    io.emit("wargning", "Usuário saiu!");
  });
});
```

# 159 - Event Acknowledments

Esse é um evento que o é disparado quando o que foi enviado ao servidor é recebido por ele, funciona como uma confirmação que o processo de envio ocorreu tudo bem. Veja o código abaixo:

**Cliente**

```javascript
function sendMessage(e) {
  e.preventDefault();

  $button.setAttribute("disabled", "disabled");

  // Aqui enviamos um callback para o servidor quando o form for enviado
  // Esperamos receber uma confirmação "message"
  socket.emit("message", { msg: $input.value }, (message) => {
    console.log(message);
  });
}

socket.on("message", (dados) => {
  // if (dados.id === socket.id) {
  //     return createDiv('message received', dados.message)
  // }
  // createDiv('message sent', dados.message)
  // http://google.com/maps?q=0,0
  // console.log(dados)
});

$form.addEventListener("submit", sendMessage);
```

**Servidor**

```js
// recebos o callback no escutador de evento
socket.on("message", (message, callback) => {
  const data = {
    id: socket.id,
    message: message.msg,
  };

  callback("recebido"); // Executamos o callback enviando uma mensagem de confirmação
  io.emit("message", data);
});
```

Agora podemos confirmar recebimento.

## 160 - Form and button states

Aqui usamos o callback enviado no event acknowledgment para poder desabilitar o botoes e formulários quando enquanto a mesagem estiver sendo enviada, e só ativa-los novamente após a confirmação de recebimento pelo servidor.

## 161 - Renderizando mensagens

Aqui usamos os scritps

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>
```
