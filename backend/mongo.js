
const { MongoClient } = require('mongodb')

async function getData() {

    try {

        const client = await new MongoClient('mongodb://localhost:27017').connect()

        if (client.code === 'ECONNREFUSED') {
            throw new Error('Erro ao conectar na base de dados')
        }

        const db = client.db('delivery')
        const coleção = db.collection('dishes')

        console.log((await coleção.find({}).toArray())[0])

    } catch (error) {
        console.log(error)
    }

    // return db
}

getData()