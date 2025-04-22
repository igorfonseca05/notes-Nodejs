const socket = io()

const $button = document.querySelector('#enviar')
const $form = document.querySelector('form')
const $input = document.querySelector('input')
const $messagesContainer = document.querySelector('.messages')
const $conversationContainer = document.getElementById("conversation")

const $sendLocation = document.querySelector('#sendLocationButton')


function createDiv(owned, dados) {
    const div = document.createElement('div')
    div.setAttribute('class', owned)

    const span = document.createElement('span')
    span.innerText = new Date().toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: '2-digit',
    })

    div.innerText = dados.message
    div.appendChild(span)

    // Criando link para localização
    if (dados.message.includes('http://google.com/maps?q=')) {
        const link = document.createElement('a')
        link.setAttribute('href', dados.message)
        link.setAttribute('target', 'blanck')
        link.innerText = 'Localização'
        div.append(link)
        // div.innerText = 'Localização'
        $messagesContainer.append(div)
        return
    }

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
            socket.emit('location', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, (message) => {
                console.log(message)
            })

        }, (error) => { console.error("Erro ao obter localização:", error); },
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
    console.log(dados)
    if (dados.id === socket.id) {
        return createDiv('message received', dados)
    }
    createDiv('message sent', dados)

    // http://google.com/maps?q=0,0

})
socket.on('location', (dados) => {

    // console.log(dados)

    if (dados.id === socket.id) {
        return createDiv('message received', dados)
    }
    createDiv('message sent', dados)

    // http://google.com/maps?q=0,0

})

$sendLocation.addEventListener('click', getLocation)
$conversationContainer.addEventListener('click', openNewConversationTab)
$form.addEventListener('submit', sendMessage)

