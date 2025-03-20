
const request = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../src/model/userModel')
const { describe } = require('yargs')


const userOneId = new mongoose.Types.ObjectId()

const user = {
    _id: userOneId,
    userName: "Paula",
    email: "paula@gmail.com",
    password: "12346",
    tokens: [{ token: jwt.sign({ '_id': userOneId }, process.env.JWT_SECRET) }]
};

beforeEach(async () => {
    await User.deleteMany()
    await new User(user).save()
})

test('Deve cadastrar usuário', async () => {
    await request(app)
        .post('/users/signup')
        .send({
            userName: 'Igor',
            email: 'igorfonseca@gmail.com',
            password: '123456'
        })
        .expect(201)
});

test('Não deve cadastrar usuário, email inválido', async () => {
    await request(app)
        .post('/users/signup')
        .send({
            userName: 'Igor',
            email: 'igorfonseca3gmail.com', // Email inválido
            password: '123456'
        })
        .expect(400)
});


test('Deve fazer login usuário', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: user.email,
            password: user.password
        })
        .expect(200)
});

test('Não deve fazer login do usuário', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'amanda@gmail.com',
            password: user.password
        })
        .expect(404)
});

// Testando rota de obter dados do usuário
test('Deve retornar dados do usuário', async () => {
    await request(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send()
        .expect(200)
})

// Testando erro ao não enviar token 
test('Não deve retornar dados do usuário, token não enviado', async () => {
    await request(app)
        .get('/users/profile')
        .set('Authorization', ``)
        .send()
        .expect(403)
})


// Testando remover conta do usuário
test('Deve remover conta do usuário', async () => {
    await request(app)
        .delete('/users/profile')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send()
        .expect(200)
})

// Testando falha na remoção da conta do usuário
test('Não deve remover conta do usuário, usuário não autorizado', async () => {
    await request(app)
        .delete('/users/profile')
        .set('Authorization', ``)
        .send()
        .expect(403)
})

afterAll(async () => {
    await mongoose.connection.close()
})