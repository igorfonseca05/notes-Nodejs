require('dotenv').config({ path: '.env.test' })

const request = require('supertest')
const app = require('../app')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../src/model/userModel')

const userId = new mongoose.Types.ObjectId()

const user = {
    _id: userId,
    userName: 'Andre',
    email: 'andre@gmail.com',
    password: '123456',
    tokens: [{
        token: jwt.sign({ _id: userId }, process.env.JWT_SECRET)
    }]
}

// vai apagar a base de dados depois de cada test
beforeEach(async () => {
    await User.deleteMany()
    await new User(user).save()
})

afterAll(async () => {
    await mongoose.connection.close()
})


test('Deve criar conta de usuário', async () => {
    await request(app).post('/users/signup').send({
        userName: 'Caio',
        email: 'Caio@gmail.com',
        password: '123456'
    }).expect(201)
})

test('Deve criar conta de usuário', async () => {
    const res = await request(app).post('/users/login').send({
        email: 'andre@gmail.com',
        password: '123456'
    }).expect(200)

    expect(res._body.success).toBe(true)
})

test('Deve buscar dados do usuário na base de dados', async () => {
    await request(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send()
        .expect(200)
})


test('Deve deletar o usuário da base de dados', async () => {
    await request(app)
        .delete('/users/profile')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Não deve deletar o usuário não autenticado', async () => {
    await request(app)
        .delete('/users/profile')
        .send()
        .expect(401)
})


test('Deve atualizar dado do usuário', async () => {
    const response = await request(app)
        .patch('/users/profile')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({ userName: 'Pedro alan' })
        .expect(200)

    const userData = await User.findById(userId)
    expect(userData.userName).toEqual('Pedro alan')
})

// test("Verificar token do usuário", async () => {

//     const response = await request(app)
//         .get('/users/profile')
//         .set('Authorization', `Bearer ${user.tokens[0].token}`)
//         .send()

//     const userData = await User.findById(user._id)
//     expect(response.body.token).toBe(userData.tokens[1].token)

// })