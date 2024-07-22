const express = require('express')
const Product = require('../models/products')

const router = express.Router()

router.get('/productos', (req, res) => {
    Product.find()
        .then((products) => {
            res.send(products)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/producto', (req, res) => {
    const product = new Product(req.body)
    product.save()
        .then(() => {
            res.send(product)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

router.delete('/producto', (req, res) => {
    const product = req.body
    Product.findOneAndDelete()
        .then(product)
        .then(res.send(`Producto eliminado: ${product}`))
        
})

router.delete('/producto', (req, res) => {
    const { name } = req.body;
    Product.findOneAndDelete({name})
        .then(product => {
            res.status(200).json(product);
        })
})

router.post('/producto', (req, res) => {
    const { name } = req.body;
    Product.findOne({ name })
        .then(product => {
            res.status(200).json(product);
        })
});

router.put('/producto/', (req, res) => {
    const value = req.body
    const update = {
        price: value.price,
        quantity: value.quantity,
        contador: value.contador
    }
    const filterByName = {
        name: value.name
    }
    Product.updateMany(filterByName, update)
        .then(res.send(`Id actualizado: ${value}`))
})



// router.put('/producto-cantidad/', (req, res) => {
//     const value = req.body
//     const quantUpdate = {
//         quantity: value.quantity
//     }
//     const filterByName = {
//         name: value.name
//     }
//     Product.findOneAndUpdate(filterByName, quantUpdate, {
//         new: true
//     })
//         .then(res.send(`Id actualizado: ${value}`)) 
// })


module.exports = router