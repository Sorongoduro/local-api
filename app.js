const express = require('express');
const productRouter = require('./src/routers/products')
const contadorRouter = require('./src/routers/contador')
// const transferRouter = require('./src/routers/transfer')
const app = express()
require('./src/db/mongoose')
const cors = require('cors')
const router = express.Router()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(router)

// app.use(transferRouter)
app.use(contadorRouter)
app.use(productRouter)


app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`)
})