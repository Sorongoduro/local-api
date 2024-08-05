const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.Schema.Types.Number.cast(false)
mongoose.Schema.Types.String.cast(false)

const schema = new Schema({
    sku: {
        type: Number,
        required: false
    },
    codigo_barra: {
        type: Number,
        required: false
    },
    id: {
        type: Number,
        required: false
    },
    nombre: {
        type: String,
        required: true
    },
    unidad_medida: {
        type: String,
        required: false
    },
    compra: {
        type: Number,
        required: false
    },
    venta: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    cantidad_minima: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: false
    }
})

const Product = mongoose.model('productos', schema)
module.exports = Product
