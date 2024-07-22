const mongoose = require('mongoose') 

const dbUser = process.env.DBUSER
const dbPass = process.env.DBPASS

const url = `mongodb+srv://lucas:benfantasmi@cluster1.3jht0ka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

mongoose.connect(url, {
    useNewUrlParser: true,
})

// .then(() => console.log("Conectado a la base de datos"))
// .catch(err => console.log("Error de conexion", err))
