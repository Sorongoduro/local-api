const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.Schema.Types.Number.cast(false)
mongoose.Schema.Types.String.cast(false)

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('productos', schema)
module.exports = Product

// const product = new Product({
//         name: "Guitarra",
//         price: 20
// }) 

// product.save()
//     .then(() => {console.log(product)})
//     .catch((err) => {console.log(err)})
