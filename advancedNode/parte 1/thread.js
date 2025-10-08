const crypto = require('crypto');

const password = 'minha_senha_super_secreta';
const salt = crypto.randomBytes(16).toString('hex'); // Gera um salt aleatório
const iterations = 100000;
const keylen = 512; // Tamanho do hash em bytes
const digest = 'sha512';

const start = Date.now()

crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
  console.log("1:", Date.now() - start)
});

crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
  console.log("2:", Date.now() - start)
});

// crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
//   console.log("3:", Date.now() - start)
// });

// crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
//   console.log("4:", Date.now() - start)
// });

// crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
//   console.log("5:", Date.now() - start)
// });

// crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
//   console.log("1:", Date.now() - start)
// });
