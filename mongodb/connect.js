const mongodb = require('mongodb')
const assert = require('assert')
assert.equal('123',1233)
const client = mongodb.MongoClient
const url = 'mongodb://localhost:27017'

const dbName = 'test'

client.connect(url, (err, client) => {
    assert(null, err)
    console.log('connected succusfully to server')
    const db = client.db(dbName)
    findDocuments()
})

    const findDocuments = function(db, callback) {
        const collection = db.collection('title')
        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
        })
    }