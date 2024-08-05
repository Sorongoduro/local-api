const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.Schema.Types.Number.cast(false)
mongoose.Schema.Types.String.cast(false)

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user' 
    }
})

const User = mongoose.model('usuarios', schema)
module.exports = User
