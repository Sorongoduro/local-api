const express = require('express')
const Client = require('../models/clientes')

const router = express.Router()

router.get('/clients', (req, res) => {
    Client.find()
        .then(clientes => {
            res.send(clientes)
        })
        .catch(err => {res.send(err)})
})

router.post('/cliente', (req, res) => {
    console.log(req.body)
    const client = new Client(req.body)
    client.save()
        .then(() => {
            console.log(client)
            res.send(client)
        })
        .catch(err => {res.send(err)})
})

router.put('/cliente-nombre', (req, res) => {
    const value = req.body
    const update = {
        fiado: value.fiado
    }
    const filterByName = {
        nombre: value.nombre
    }
    Client.updateMany(filterByName, update)
        .then(console.log('Valor actualizado: ' + update))
        .catch(err => console.log(err))
    })

router.put('/cliente-apellido', (req, res) => {
    const value = req.body
    const update = {
        fiado: value.fiado
    }
    const filterBySurname = {
        apellido: value.apellido
    } 
    Client.updateMany(filterBySurname, update)
        .then(console.log('Valor actualizado: ' + update))
        .catch(err => console.log(err))
    })

module.exports = router