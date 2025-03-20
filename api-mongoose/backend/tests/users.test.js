
require('dotenv').config({ path: "test.env" })

const request = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')

const User = require('../src/model/userModel')


const user = {
    userName: "Paula",
    email: "paula@gmail.com",
    password: "12346",
};

beforeEach(async () => {
    await User.deleteMany()
    await new User(user).save()
})

describe('Testar rotas de login e cadastro da API', () => {

    test('Deve cadastrar usuário', async () => {
        await request(app)
            .post('/users/signup')
            .send({
                userName: 'Igor',
                email: 'igorfonseca@gmail.com',
                password: '123456'
            })
            .expect(201)
    })

    test('Não deve cadastrar usuário', async () => {
        await request(app)
            .post('/users/signup')
            .send({
                userName: 'Igor',
                email: 'igorfonseca3gmail.com', // Email inválido
                password: '123456'
            })
            .expect(404)
    })


    test('Deve fazer login usuário', async () => {
        await request(app)
            .post('/users/login')
            .send({
                email: user.email,
                password: user.password
            })
            .expect(200)
    })

    test('Não deve fazer login do usuário', async () => {
        await request(app)
            .post('/users/login')
            .send({
                email: 'amanda@gmail.com',
                password: user.password
            })
            .expect(404)
    })

})

afterAll(async () => {
    await mongoose.connection.close()
})