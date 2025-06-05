![capa](https://github.com/user-attachments/assets/95888dad-75e7-4ec1-9023-40a5e6c43c74)

# Conteúdo do Curso

- [x] Seção 1 - [Boas-vindas](#seção-1---boas-vindas)
- [x] Seção 2 - [Instalando e Explorando Node.js](#instalando-e-explorando-nodejs)
- [x] Seção 3 - [Sistema de Módulos do Node.js (App de Notas)](#seção-3---sistema-de-módulos-do-nodejs-app-de-notas)
- [ ] Seção 4 - [Sistema de Arquivos e Argumentos de Linha de Comando (App de Notas)](#sistema-de-arquivos-e-argumentos-de-linha-de-comando-app-de-notas)
- [ ] Seção 5 - [Depuração no Node.js (App de Notas)](#seção-5---depuração-no-nodejs-app-de-notas)
- [ ] Seção 6 - [Node.js Assíncrono (App de Clima)](#seção-6---nodejs-assíncrono-app-de-clima)
- [ ] Seção 7 - [Servidores Web (App de Clima)](#seção-7---servidores-web-app-de-clima)
- [ ] Seção 8 - [Acessando API a partir do Navegador (App de Clima)](#seção-8---acessando-api-a-partir-do-navegador-app-de-clima)
- [ ] Seção 9 - [Implantação de Aplicações (App de Clima)](#seção-9---implantação-de-aplicações-app-de-clima)
- [ ] Seção 10 - [MongoDB e Promises (App de Tarefas)](#seção-10---mongodb-e-promises-app-de-tarefas)
- [ ] Seção 11 - [APIs REST e Mongoose (App de Tarefas)](#seção-11---apis-rest-e-mongoose-app-de-tarefas)
- [ ] Seção 12 - [Autenticação de API e Segurança (App de Tarefas)](#seção-12---autenticação-de-api-e-segurança-app-de-tarefas)
- [ ] Seção 13 - [Ordenação, Paginação e Filtro (App de Tarefas)](#seção-13---ordenação-paginação-e-filtro-app-de-tarefas)
- [ ] Seção 14 - [Upload de Arquivos (App de Tarefas)](#seção-14---upload-de-arquivos-app-de-tarefas)
- [ ] Seção 15 - [Enviando E-mails (App de Tarefas)](#seção-15---enviando-e-mails-app-de-tarefas)
- [ ] Seção 16 - [Testando Node.js (App de Tarefas)](#seção-16---testando-nodejs-app-de-tarefas)
- [ ] Seção 17 - [Aplicações Web em Tempo Real com Socket.io (App de Chat)](#seção-17---aplicações-web-em-tempo-real-com-socketio-app-de-chat)
- [ ] Seção 18 - [Conclusão](#seção-18---conclusão)

### **Meu progresso no curso**

![3](https://github.com/user-attachments/assets/c5176a77-5594-4c34-b7a8-24f14cd1ff5f)

# Instalando e Explorando Node.js

## Resumo sobre Node.js

Node.js é uma plataforma construída sobre o motor JavaScript V8 do Google Chrome que permite a execução de código JavaScript no lado do servidor. Criada em 2009, sua principal característica é a arquitetura assíncrona e orientada a eventos, utilizando operações não bloqueantes (non-blocking I/O). Essa abordagem torna o Node.js altamente eficiente para lidar com um grande número de conexões simultâneas e aplicações de I/O intensivo.

## Instalação

### 1. Escolhendo a versão do Node

Antes de instalar, é importante decidir qual versão do Node.js você vai usar. Existem duas opções principais:

- **Versão LTS (Long Term Support)**: Ideal para projetos em produção. É a versão recomendada para a maioria dos usuários, já que recebe suporte e atualizações de segurança por mais tempo.
- **Versão Current**: Inclui os recursos mais recentes, mas pode ser menos estável para projetos em produção.

### 2. Instalando no windows

**Passo 1: Acesse o site oficial do Node.js**  
Abra o site oficial do Node.js nodejs.org e baixe a versão LTS (ou outra de sua preferência).

**Passo 2: Inicie o Instalador**  
Depois de baixar o instalador, abra o arquivo .msi e siga as instruções na tela. Certifique-se de selecionar a opção "Automatically install the necessary tools" para configurar também o ambiente de desenvolvimento.

**Passo 3: Verifique a Instalação**  
Abra o Prompt de Comando (CMD) ou o PowerShell e execute os comandos abaixo para garantir que o Node.js foi instalado corretamente:

```bash
node -v
npm -v
```

Se você vir a versão do Node.js e do NPM, a instalação foi um sucesso!

## Características Principais:

- **Ambiente de Tempo de Execução no Servidor**: Executa JavaScript fora do navegador.
- **Modelo Assíncrono e Baseado em Eventos**: Permite operações não bloqueantes e escalabilidade.
- **NPM (Node Package Manager)**: Um dos maiores gerenciadores de pacotes com mais de 1 milhão de bibliotecas.
- **Ecossistema Vibrante e Comunidade Ativa**: Suporte, ferramentas e bibliotecas diversas.
- **Desenvolvimento Fullstack Unificado**: Mesma linguagem para frontend e backend.

## Casos de Uso Indicados:

- Aplicações de tempo real, como chats e plataformas colaborativas.
- APIs RESTful e microsserviços.
- Servidores de streaming e manipulação de arquivos.
- Ferramentas de automação e linha de comando.

## Quando Evitar:

- **Aplicações Computacionalmente Intensivas**: Pode não ser eficiente para tarefas que exigem processamento pesado de CPU.
- **Operações Sincronas**: O modelo de execução de Node.js não é otimizado para tarefas síncronas.

## Conclusão

Node.js é ideal para construir aplicações escaláveis, eficientes e modernas, com alta capacidade de resposta, sendo uma escolha popular para desenvolvedores fullstack que desejam uma linguagem unificada entre cliente e servidor.

# Seção 4 - Sistema de Módulos do Node.js (App de Notas)

## Aula 15 - Obtendo inputs de usúario

Linhas de comando no terminal são amplamente usada dentro da programação em diversas linguagens, mas e se
fosse possivel obter os comandos que digitamos no terminal? Como poderiamos realizar operações com eles? Nesta seção aprenderemos como podemos obter e manipular linhas de comando dentro do nodeJS.

Para inicio de conversa, considere que no terminal inserimos o seguinte comando:

```bash
PS C:\FileSystem> node app.js MyList
```

<!-- ![alt text](img/image-1.png) -->

temos então o comando **node**, **app.js** e **MyList** que podemos capturar dentro do nosso código:

```javascript
console.log(process.argv);
```

Acima usamos o objeto global **process** junto com o **argv** para obter os inputs
inseridos no terminal. Como resultado temos que:

```bash
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Igor\\Documents\\Repositório\\notes-Nodejs\\FileSystem\\app.js',
  'MyList'
]
```

a operação com o _argv_ retorna um array onde podemos obter os dados retornados de acordo com a posição do elemento dentro do array. Vamos aplicar esse conhecimento em um exemplo simples onde adicionaremos ou removeremos notas a depender
do comando inserido no terminal.

Dentro do nosso arquivo app.js vamos fazer

```javascript
const command = process.argv[2];

if (command === "add") {
  console.log("Sua nota foi adicionada");
} else if (command === "remove") {
  console.log("Sua nota foi removida");
} else {
  console.log("Comando incorreto, use Add ou Remove");
}
```

## Aula 16 - Analisando o argumento com o yargs - part 1

Na ultima aula, vimos como utilizar o **process.argv** para obtemos os
argumentos da linha de comando e criar condicionais com esses comandos. Apesar de util,
o retorno do comando **process.argv** não é capaz de converter todo e qualquer
comando, um vez que interpreta caracteres especiais como parte do comando inserido. Vejamos
um exemplo. Se inserirmos no terminal o comando

```bash
PS C:\FileSystem> node ./app.js myList --title='Comprar suprimentos'

```

vamos ver como retorno no terminal:

```bash
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\UsersFileSystem\\app.js',
  'myList',
  '--title=Comprar suprimentos'
]
```

perceba que os comandos foram interpretados como string sem considerar os caracteres especias. Para podermos criar linhas de comando mais complexas vamos precisar utilizar o
pacote disponível no npm, _Yet Another Reasonably Good Shell_ (**Yargs**), que pode ser traduzido como "Mais uma razoavelmente boa ferramenta de shell.".

O Yargs é uma biblioteca popular para Node.js usada para simplificar a manipulação de argumentos de linha de comando em aplicações. Ele foi criado para tornar mais fácil escrever scripts e ferramentas de linha de comando, interpretando, processando e estruturando argumentos e comandos passados pelo terminal de maneira eficiente e com uma interface amigável. Com o Yargs possui funcionalidades importantes como:

1. **Parsear Argumentos**
2. **Definir comandos**
3. **Validar Argumentos**
4. **Ajuda e Versão Automáticas**
5. **Suporte a Alias e Abreviações**
6. **Comandos Interativos**

Além disso, as vantagens de se utilizar o Yargs são:

- **Facilidade de uso**: Simplifica a manipulação de argumentos e a criação de ferramentas CLI(command line).
- **Extensível**: Suporta subcomandos complexos e opções detalhadas.
- **Interface amigável**: O sistema de ajuda e validação tornando o uso mais intuitivo.
- **Suporte a promessas**: Permite o uso de funções assíncronas para lidar com comandos.

Em resumo, o Yargs é uma biblioteca muito poderosa e flexível para quem precisa criar ferramentas de linha de comando em Node.js. Ele cuida de muitas tarefas comuns, como parsing de argumentos, validação, criação de comandos e subcomandos, tornando a experiência de desenvolvimento mais simples e produtiva.

### Instalação e uso do Yargs

Para instalar o yargs, no terminal do Node dentro do diretório do seu projeto digite:

    npm i yargs

Após a instalação do pacote, devemos importa-lo em nossa aplicação

```javascript
const yargs = require("yargs");
```

Agora estamos prontos para utilizar as funcionalidades desponibilizadas por essa ferramenta. Vamos replicar o exemplo que fizemos acima para entendermos as vantagens de se utilizar o yargs.
Dentro do arquivo **app.js** vamos adicionar a linha:

```javascript
const yargs = require("yargs");

console.log(yargs.argv);
```

Agora no terminal inserimos o mesmo comando inserido no exemplo anterior

```bash
  PS C:\FileSystem> node ./app.js myList --title='Comprar suprimentos'
```

o resultado mostrado no terminal será

```bash
  {
  _: [ 'node', './app.js', 'myList' ],
  title: 'Comprar suprimentos',
  '$0': 'app.js'
  }
```

Isso porque no processo de parseamento da linha de comando o Yargs transforma os argumentos de linha de comando em um **objeto JavaScript**, permitindo fácil acesso aos valores passados.

Sabemos que com o Yargs podemos obter e parsear comandos de terminal, agora veremos como esse recurso pode ser utilizado na criação de comandos no node.  
Para criar comandos, você pode usar o método `.command()` do yargs. Cada **comando** pode ter uma **descrição** e pode ser associado a uma **função** que será executada quando o comando for chamado. Vejamos o exemplo abaixo:

```javascript
const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Adiciona um novo item",
  handler() {
    console.log(`Item adicionado a lista`);
  },
});

yargs.parse(); // Necessário para processar os comandos
```

perceba que passamos um **objeto** como argumento para o método `.command()` e esse objeto possui os seguintes campos:

- **command**: Define o comando, neste caso add, que será chamado na CLI como node app.js add.
- **describe**: Fornece uma descrição do comando, que será exibida ao usar --help.
- **handler**: Função que será executada quando o comando for invocado, recebendo os argumentos através do objeto argv.

A nivel de commando, dentro do yargs temos 4 comandos basicos que são o :

        add, remove, list, read

Utilizamos o **Add** acima, os demais comandos fica como exercicio onde vc criará a estrutura basíca de cada um deles e
e exibindo mensages dentro da função hadler que estejam de acordo com a ação que está sendo executada pelo método.

> YOLO test commit 🚀

