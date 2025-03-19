
require('dotenv').config({ path: "test.env" })

const request = require('supertest')
const app = require('../app')


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