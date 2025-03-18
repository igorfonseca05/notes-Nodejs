
require('dotenv').config({ path: '.env.test' })

const { sum } = require('./math')


test('obter soma', () => {
    const soma = sum(1, 2)
    expect(soma).toBe(3)
})


test('Nome deve ser igor', () => {
    const name = 'Alan'

    expect(name).toBe('igor')
})