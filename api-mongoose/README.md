# API REST e serviço de Autenticação

Para iniciar o projeto, crie uma pasta onde irá adicionar toda a lógica do projeto e no terminal do VScode instale os seguintes pacotes

## 📌 Pacotes para Autenticação no Node.js

    npm i express mongoose dotenv jsonwebtoken cors cookie_parser nodemon validator argon2

# 📌 Breve descrição pacotes

- **Express** é um framework minimalista para construir APIs e servidores web em Node.js.
- **Mongoose** é uma biblioteca que simplifica a modelagem e manipulação de dados no MongoDB usando esquemas flexíveis.
- **dotenv** é um módulo que permite armazenar informações sensíveis, como chaves secretas e URLs de banco de dados, em um arquivo `.env`.
- **jsonwebtoken (JWT)** é uma biblioteca usada para gerar e validar tokens JWT para autenticação segura.
- **cors** é um middleware que permite ou restringe solicitações de diferentes domínios para a API.
- **cookie-parser** é um middleware que facilita a leitura e manipulação de cookies em requisições HTTP.
- **nodemon** é uma ferramenta que reinicia automaticamente o servidor Node.js quando há alterações no código.
- **validator** é uma biblioteca que fornece validações para dados como e-mails, URLs e números.
- **argon2** é um algoritmo moderno de hashing para senhas, considerado altamente seguro.
- **bcryptjs** é uma alternativa ao Argon2 para criptografar senhas de forma segura.
- **express-rate-limit** é um middleware que limita requisições repetitivas para evitar ataques de força bruta.
- **helmet** é um middleware que melhora a segurança da API definindo cabeçalhos HTTP adequados.
- **morgan** é um logger que registra detalhes das requisições HTTP para facilitar a depuração e monitoramento.

## 1 - Servidor

Todo API ou sistema de autenticação precisa de um servidor rodando para ser executado. Criamos o arquivo **server.js** onde colocamos adicionamos o codigo abaixo.

```javascript
require("dotenv").config(); /* Variaveis de ambiente config*/
const express = require("express");

const app = express();

// server config
const port = process.env.port || 3000; //Porta onde será executado nosso servidor

// Database Connection
const { dbConnection, dbEvents } = require("./src/db/dbConnection"); // Arquivo onde armazeno a conexão com a BD

dbConnection();

// Routes
const routes = require("./src/routes/routes");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Bem vindo ao servidor" });
});

// Middlewares
app.use(express.json()); // Permite processar JSON
app.use(express.urlencoded({ extended: true })); // Permite processar dados de formulários
app.use(routes); // Rotas do projeto

// Servidor
dbEvents.on("connected", () => {
  // "on" escuta o evento de conexão da DB e libera o servidor
  app.listen(port, () => {
    console.log("Servidor On");
    console.log("Acesse em http://localhost:3000");
  });
});
```

## 2 - Arquivos de Rotas
