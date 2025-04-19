const socket = io()

const $button = document.querySelector('#enviar')
const $form = document.querySelector('form')
const $input = document.querySelector('input')
const $messagesContainer = document.querySelector('.messages')
const $conversationContainer = document.getElementById("conversation")


function createDiv(owned, message) {
    const div = document.createElement('div')
    div.setAttribute('class', owned)
    div.innerHTML = message
    $messagesContainer.append(div)
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

    $button.setAttribute('disabled', 'disabled')

    socket.emit('message', { msg: $input.value }, (message) => {
        $button.removeAttribute('disabled')
        $input.value = ''
    })
}

function getLocation() {
    navigator.geolocation
        .getCurrentPosition(position => {
            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })

        },
            (error) => {
                console.error("Erro ao obter localização:", error);
            },
            {
                enableHighAccuracy: true, // <- ESSENCIAL
                timeout: 10000,
                maximumAge: 0
            })
}

socket.on('greating', (message) => {
    console.log(message)
})

socket.on('warning', (message) => {
    console.log(message)
})

socket.on('message', (dados) => {
    if (dados.id === socket.id) {
        return createDiv('message received', dados.message)
    }
    createDiv('message sent', dados.message)

    // http://google.com/maps?q=0,0

    console.log(dados)
})


$conversationContainer.addEventListener('click', openNewConversationTab)
$form.addEventListener('submit', sendMessage)

getLocation()