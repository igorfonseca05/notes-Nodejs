// require('dotenv').config()

const mongoose = require('mongoose')
const Events = require('events')

const dbEvents = new Events()

// console.log(process.env.DB_URL)

mongoose.connect(process.env.DB_URL)
    .then(() => {
        // dbEvents.emit('connected')
    })
    .catch((error) => {
        console.log(error)
    })
// function dbConnection() {
// }

module.exports = { dbEvents }