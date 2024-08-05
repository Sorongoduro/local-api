const mongoose = require('mongoose') 

const url = `mongodb://127.0.0.1:27017/productos`

mongoose.connect(url, {
    useNewUrlParser: true,
})

// .then(() => console.log("Conectado a la base de datos"))
// .catch(err => console.log("Error de conexion", err))
