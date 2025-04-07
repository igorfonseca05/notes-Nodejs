# MongoDB e promises

Nesta seção vamos aprender como usar o pacote do mongoDB para executar as operações CRUD. Considerando que toda a configuração do mongo já tenha sido feita previamente no seu computador, vamos iniciar nosso estudo realizando a oeperação de inserção de dados, mas antes vamos intalar o pacote do mongo fazendo:

    npm i mongodb

```js
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient; // vai nos fornecer funçoes pra add dados

const url = "mongodb://12.0.0.1:27017";
const database = "test";

const client = new MongoClient(url);
```
