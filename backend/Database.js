
const mongoose = require('mongoose')
const EventEmitter = require('events')

const dbEvents = new EventEmitter()

function getDbConnection(url) {
    mongoose.connect(url)
        .then((res) => {
            console.log('connected')
            dbEvents.emit('connected')
        }).catch((error => {
            console.log(error)
        }))
}

module.exports = { getDbConnection, dbEvents }



