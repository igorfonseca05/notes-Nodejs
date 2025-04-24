const socket = io()

const $button = document.querySelector('#enviar')
const $form = document.querySelector('form')
const $input = document.querySelector('input')
const $messagesContainer = document.querySelector('.messages')
const $conversationContainer = document.getElementById("conversation")
const $conversationinfo = document.querySelector(".conversation-info")
const $userName = document.querySelector(".conversation-name")
const $info = document.querySelector(".conversation-last-msg")

const $sendLocation = document.querySelector('#sendLocationButton')


const params = Object.fromEntries(new URLSearchParams(location.search))

function createDiv(owned, dados) {
    const div = document.createElement('div')
    div.setAttribute('class', owned)

    const span = document.createElement('span')
    span.setAttribute('class', 'messageTime')
    span.innerText = new Date(dados.createdAt).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: '2-digit',
    })


    // Criando link para localização
    if (dados.message.includes('http://google.com/maps?q=')) {
        const link = document.createElement('a')
        link.setAttribute('href', dados.message)
        link.setAttribute('target', 'blanck')
        link.innerText = 'Localização'
        div.append(link)
        div.appendChild(span)
        // div.innerText = 'Localização'
        $messagesContainer.append(div)
        return
    }

    div.innerText = dados.message
    div.appendChild(span)
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

    socket.emit('message', { msg: $input.value, ...params }, (message) => {
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
    if (dados.id === socket.id) {
        return createDiv('message received', dados)
    }
    createDiv('message sent', dados)
})

socket.on('connected', (user) => {
    const conversation = document.createElement('div')
    conversation.setAttribute('class', 'conversation')

    const img = document.createElement('img')
    img.setAttribute('src', 'https://i.pravatar.cc/40?img=2')

    const conversationInfo = document.createElement('div')
    conversationInfo.setAttribute('class', 'conversation-info')

    const spanName = document.createElement('span')
    spanName.setAttribute('class', 'conversation-name')
    spanName.innerText = user

    const spanInfo = document.createElement('span')
    spanInfo.setAttribute('class', 'conversation-last-msg')
    spanInfo.innerText = 'Está online'

    conversationInfo.append(spanName, spanInfo)
    conversation.append(img, conversationInfo)
    $conversationContainer.insertAdjacentElement('afterbegin', conversation)
})

socket.on('digitando', () => {
    console.log('digitando')
})


socket.emit('join', { ...params })
socket.emit('warning', params.username)
socket.emit('connected', { ...params })

$sendLocation.addEventListener('click', getLocation)
$conversationContainer.addEventListener('click', openNewConversationTab)
$form.addEventListener('submit', sendMessage)
$input.addEventListener('input', (e) => socket.emit('digitando'))
