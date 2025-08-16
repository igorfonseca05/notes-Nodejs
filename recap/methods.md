

# Module -Path(nativo)

* path.basename()
* path.extname()
* path.normalize()
* path.join()

# Module -File System(nativo)(Sincrono)

* fs.mkdirSync('path ')
* fs.writeFileSync('path', 'conteudo do arquivo')
* fs.readFileSync('path', 'utf-8')
* fs.appendFileSync('path', '\n Novo conteudo adicional')

# Module - File System (nativo) (Assíncrono)

* fs.access('path', (err) => { ... })
* fs.mkdir('path', (err) => { ... })
* fs.writeFile('path', 'conteúdo do arquivo', (err) => { ... })
* fs.readFile('path', 'utf-8', (err, data) => { ... })
* fs.appendFile('path', '\n Novo conteúdo adicional', (err) => { ... })

# Module - File System (nativo) (Assíncrono com Promises / async-await)

Aqui mostro como usar cada um dos métodos acima usando a versão moderna para se trabalhar com códigos assincronos 

```javascript
const fs = require('fs').promises;

// Verificar se o arquivo/diretório existe
async function checkExists(path) {
  try {
    await fs.access(path);
    console.log('Existe');
  } catch {
    console.log('Não existe');
  }
}

// Criar diretório
async function createDir(path) {
  await fs.mkdir(path);
}

// Criar/Escrever arquivo
async function writeFile(path, content) {
  await fs.writeFile(path, content);
}

// Ler arquivo
async function readFile(path) {
  const data = await fs.readFile(path, 'utf-8');
  return data;
}

// Adicionar conteúdo ao arquivo
async function appendFile(path, content) {
  await fs.appendFile(path, content);
}
```


# Module - http(nativo)

* http.createServer((req, res) => {})
* http.extname()
* http.normalize()
* http.join()



