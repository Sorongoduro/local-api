const mongoose = require('mongoose') 

const dbUser = process.env.dbUser

const dbPass = process.env.dbPass

const url = `mongodb+srv://${dbUser}:${dbPass}@cluster1.3jht0ka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

mongoose.connect(url, {
    useNewUrlParser: true,
})

// .then(() => console.log("Conectado a la base de datos"))
// .catch(err => console.log("Error de conexion", err))
