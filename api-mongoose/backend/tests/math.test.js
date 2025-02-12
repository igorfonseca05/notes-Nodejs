
require('dotenv').config({ path: '.env.test' })


// test('Deve retornar nome igor', () => {
//     const nome = 'alan'
//     expect(nome).toBe('igor')
// })

test('Deve retornar nome igor', () => {
    expect(process.env.DB_URL).toBe('mongodb://127.0.0.1:27017/auth')

})

