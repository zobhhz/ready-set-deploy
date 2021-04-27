const express = require("express")
const router = express.Router()
var mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

router.get('/', async (req, res) => {
    connect((db) => {
        if(db) {
            db.collection('todos').find().toArray().then(result => {
                res.render('index', {
                    data: result
                })
            })
        }
    })
})

router.post('/create', async (req, res) => {
    connect((db) => {
        if(db) {
            db.collection('todos').insertOne(req.body).then(() => {
                db.collection('todos').find().toArray().then(result => {
                    res.json(result)
                })
            })
        }
    })
})

router.post('/delete', async (req, res) => {
    connect((db) => {
        if(db) {
            db.collection('todos').deleteOne({ _id: new mongodb.ObjectID(req.body.id) }).then(() => {
                db.collection('todos').find().toArray().then(result => {
                    res.json(result)
                })
            })
        }
    })
})

function connect(callback) {
    MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(client => {
        callback(client.db(process.env.NODE_ENV))
    }).catch(err => {
        console.log(err)
        callback(null)
    })
}

module.exports = router