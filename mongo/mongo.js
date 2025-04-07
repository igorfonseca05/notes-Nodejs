// Crud operations

const url = 'mongodb://localhost:27017'
const database = 'testes'

const { MongoClient, ObjectId } = require('mongodb')

const client = new MongoClient(url)

async function dbConnection() {
    try {

        await client.connect()

        const db = client.db('loja')
        const collection = db.collection('produtos')

        const res = await collection.insertOne({
            name: 'Lápis',
            price: '3,60'
        })

        console.log('Dado inserido na base de dados', res)
    } catch (error) {
        console.log(error)
    } finally {
        client.close()
    }
}


// Escrevendo query de busca de dados

async function getData() {
    try {
        await client.connect()

        const db = client.db('loja')
        const collection = db.collection('produtos')

        const doc = await collection.find({ name: 'Lápis' }).toArray()

        console.log(doc.count())
    } catch (error) {
        console.log(error)
    } finally {
        client.close()
    }

}


getData()
// dbConnection()

