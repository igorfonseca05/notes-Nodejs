
const socket = io()

const button = document.querySelector('#enviar')

socket.on('countUpdated', (res) => {
    console.log('Count has been updated', res)
})

const message = 'oi'

button.addEventListener('click', (e) => {

    console.log(e.target.value)

    socket.emit('message', {})
})
