
const socket = io()

const button = document.querySelector('#enviar')
const form = document.querySelector('form')
const input = document.querySelector('input')
const messagesContainer = document.querySelector('.messages')



function createDiv(owned, message) {
    const div = document.createElement('div')
    div.setAttribute('class', owned)
    div.innerHTML = message
    messagesContainer.append(div)
}

socket.on('sent', ({ id, message }) => {
    if (id === socket.id) {
        return createDiv('message received', message)
    }
    createDiv('message sent', message)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    socket.emit('message', { msg: input.value })
    input.value = ''
})




















// socket.on('connect', () => {
//     console.log('Conectado como:', socket.id)
// })

// function createDiv(owned, message) {
//     const div = document.createElement('div')
//     div.setAttribute('class', owned)
//     div.innerHTML = message
//     messagesContainer.append(div)
// }

// socket.on('sent', ({ id, message }) => {
//     if (id === socket.id) {
//         createDiv("message received", message)
//     } else {
//         createDiv('message sent', message)
//     }
// })


form.addEventListener('submit', (e) => {
    e.preventDefault()

})
