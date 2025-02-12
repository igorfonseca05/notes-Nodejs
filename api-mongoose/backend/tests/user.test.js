require('dotenv').config({ path: '.env.test' })

const request = require('supertest')
const app = require('../app')

const mongoose = require('mongoose')



test('Deve criar conta de usuário', async () => {
    await request(app).post('/users/signup').send({
        userName: 'Caio',
        email: 'Caio@gmail.com',
        password: '12345678'
    }).expect(201)
})


// afterAll(async () => {
//     await mongoose.connection.close()
// })