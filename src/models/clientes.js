const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.Schema.Types.Number.cast(false)
mongoose.Schema.Types.String.cast(false)

const schema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    celular: { 
        type: String, 
        required: false
    },
    fiado: {
        type: Number,
        required: false
    }
})

const Client = mongoose.model('clientes', schema)
module.exports = Client
