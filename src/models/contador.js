const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.Schema.Types.Number.cast(false)
mongoose.Schema.Types.String.cast(false)

const schema = new Schema({
    contador: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

const Contador = mongoose.model('contador', schema)
module.exports = Contador