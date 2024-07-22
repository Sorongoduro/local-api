const express = require('express')
const Contador = require('../models/contador')

const router = express.Router()

router.get('/contador', (req, res) => {
    Contador.find()
        .then((cont) => {
            res.send(cont)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/contador/', (req, res) => {
    const value = req.body
    const update = {
        contador: value.contador,
        total: value.total
    }
    Contador.updateOne(update)
        .then(res.send(`Valor actualizado: ${update}`))
})

module.exports = router