
const socket = io()

const button = document.querySelector('#enviar')
const form = document.querySelector('form')
const input = document.querySelector('input')
const messagesContainer = document.querySelector('.messages')
const conversationContainer = document.getElementById("conversation")


function createDiv(owned, message) {
    const div = document.createElement('div')
    div.setAttribute('class', owned)
    div.innerHTML = message
    messagesContainer.append(div)
}

function openNewConversationTab(e) {
    const div = e.target.closest('.conversation')

    const userName = div.querySelector('.conversation-name').innerText
    const imgUrl = div.querySelector('img').src
    const conversationHeader = document.querySelector(".chat-header")

    const img = document.createElement('img')
    img.setAttribute('src', `${imgUrl}`)

    conversationHeader.innerText = userName
    conversationHeader.insertAdjacentElement('afterbegin', img)
}

function sendMessage(e) {
    e.preventDefault()

    socket.emit('message', { msg: input.value })
    input.value = ''
}


socket.on('greating', (message) => {
    console.log(message)
})

socket.on('warning', (message) => {
    console.log(message)
})

socket.on('message', ({ id, message }) => {
    if (id === socket.id) {
        return createDiv('message received', message)
    }
    createDiv('message sent', message)
})

conversationContainer.addEventListener('click', openNewConversationTab)

form.addEventListener('submit', sendMessage)


// navigator.geolocation.getCurrentPosition(position => console.log(position))