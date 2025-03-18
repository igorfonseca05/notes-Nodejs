
const { sum, add } = require('./math')

// Teste 1
test('obter soma', () => {
    const soma = sum(1, 2)
    expect(soma).toBe(3)
})

// Teste 2
test('Nome deve ser igor', () => {
    const name = 'igor'
    expect(name).toBe('igor')
})

// Teste 3
test('async', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 2000)
})

// Teste 4 

test('shoud sum two numbers', (done) => {
    add(1, 2)
        .then((sum) => {
            expect(sum).toBe(3)
            done()
        })
})