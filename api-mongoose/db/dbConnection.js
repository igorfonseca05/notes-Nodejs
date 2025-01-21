
const mongoose = require('mongoose')
const Events = require('events')

const db = new Events()

mongoose.connect('mongodb://127.0.0.1/27017')
    .then(() => {
        console.log('base conectada')
    })
    .catch((error) => {
        console.log(error)
    })