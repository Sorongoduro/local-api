const express = require('express');

const productRouter = require('./src/routers/products')
const contadorRouter = require('./src/routers/contador')
const userRouter = require('./src/routers/users')

const clientRouter = require('./src/routers/clientes.js')

const productos = require('./utils/products')
const contador = require('./utils/contador')
const usuarios = require('./utils/users')

const clientes = require('./utils/clientes')

const path = require('path')
const app = express()
require('./src/db/mongoose')
const cors = require('cors')
const session = require('express-session');
const passport = require('passport')

// const router = express.Router()
const port = process.env.PORT || 3001

// EJS Configuration
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({
    origin: 'https://local-api-822e4889e0cf.herokuapp.com/',
    credentials: true 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

app.use(passport.initialize())
app.use(passport.session())

require('./src/strategies/local-strategy')

// Routes
app.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        console.log(req.session)
        productos.getAllProducts(productos => {
            contador.getContador(contador => {
                clientes.getAllClients(clientes => {
                    res.render('index', {
                        title: "Productos",
                        productos,
                        contador,
                        clientes,
                        userRole: req.user.role
                    })
                })
            })
        })
    } else {
        res.redirect('/login')
    }
})

app.get('/register', (req, res) => {
    res.render('./pages/register', {
        title: "Registrarse"
    })
})

app.get('/login', (req, res) => {
    if(!req.isAuthenticated()) {
    res.render('./pages/login', {
        title: "Iniciar sesion"
        })
    } else {
        res.redirect('/')
    }
})

app.get('/add', (req, res) => {

        res.render('./pages/add', {
            title: "Añadir Producto",
            userRole: req.user.role
        })
})


app.get('/update', (req, res) => {
    if(req.isAuthenticated()) {
        res.render('./pages/update', {
            title: "Actualizar Producto",
            userRole: req.user.role
        })
    } else {
        res.redirect('/login')
    }
})


app.get('/delete', (req, res) => {
    if(req.isAuthenticated()) {
        res.render('./pages/delete', {
            title: "Eliminar Producto",
            userRole: req.user.role
        })
    } else {
        res.redirect('/login')
    }
})

app.get('/agregar-cliente', (req, res) => {

    res.render('./pages/add-client', {
        title: "Añadir Cliente",
        userRole: req.user.role
    })
})

app.get('/modificar-cliente', (req, res) => {
    res.render('./pages/update-client', {
        title: "Modificar Cliente",
        userRole: req.user.role
    })
})

app.get('/eliminar-cliente', (req, res) => {
    res.render('./pages/delete-client', {
        title: "Eliminar Cliente",
        userRole: req.user.role
    })
})



app.get('/escaso', (req, res) => {
    if(req.isAuthenticated()) {
        productos.getAllProducts(productos => {
            res.render('./pages/escaso', {
                title: "Productos",
                productos,
                userRole: req.user.role
            })
        })
    } else {
        res.redirect('/login')
    }
})

app.get('/cierre', (req, res) => {
    if(req.isAuthenticated()) {
        contador.getContador(contador => {
            res.render('./pages/cierre', {
                title: "Productos",
                contador,
                userRole: req.user.role
            })
        })
    } else {
    res.redirect('/login')
    }
})

app.get('/clientes', (req, res) => {
    clientes.getAllClients(clientes => {
        res.render('./pages/clientes', {
            title: "Clientes",
            clientes,
            userRole: req.user.role
        })
    })
})


app.use(contadorRouter)
app.use(productRouter)
app.use(userRouter)
app.use(clientRouter)

// Error Handle Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error');
});

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`)
})