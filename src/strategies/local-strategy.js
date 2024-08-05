const passport = require('passport')
const { Strategy } = require('passport-local')
const bcrypt = require('bcrypt')
const User = require('../models/users')

passport.serializeUser((user, done) => {
    console.log("Dentro de Serialize User")
    console.log(user)
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    console.log(`Dentro de Deserialize User`)
    User.findById(id)
        .then((usuario) => {
            done(null, usuario)
        })
        .catch((err) => {done(err, null)})
})

passport.use(
    new Strategy((username, password, done) => {
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)
        User.findOne({username})
            .then((usuario) => {
                if(!usuario) throw new Error('Usuario no encontrado')
                bcrypt.compare(password, usuario.password)
                        .then(isValid => {
                            if(!isValid) throw new Error('Credenciales invalidas')
                            done(null, usuario)
                        })
            })
            .catch(err => {done(err, null)})
    })
)
