const express = require('express')
const User = require('../models/users')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

router.get('/usuarios', (req, res) => {
    User.find()
        .then(usuarios => {
            res.send(usuarios)
        })
        .catch(err => res.send(err))
})

router.post('/register', (req, res) => {
    const user = new User(req.body)
    const pass = req.body.password

    
    User.countDocuments({})
        .then(conteo => {
            console.log("Conteo de usuarios: " + conteo)
            if (conteo === 0) {
                user.role = 'admin'
            } else {
                user.role = 'user'
            }
        })
    bcrypt.hash(pass, 10)
        .then((password) => {
            user.password = password
            user.save()
            .then(() => {
                console.log(user)
            })
            .catch((err) => {
                res.status(500).send(err)
            })
        })
    res.redirect('/login')
})



// router.post('/auth', (req, res) => {
//     const {username} = req.body
//     User.findOne({username})
//             .then((user) => {
//                     req.session.user = user
//                     return res.send(req.session.user)
//                 })
//             .catch(err => {console.log(err, {msg: 'No se encontro el usuario'})})
// })


router.post('/auth', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}), (req, res) => {
    res.status(200).send('Autorizado')
})

router.get('/logout', (req, res) => {
    // req.logout()
    req.session.destroy(function (err) {
        res.redirect('/login')
      });
})

router.get('/auth/status', (req, res) => {
    // req.sessionStore.get(req.sessionID, (err, session) => {
    //     console.log(req.session)
    // })
    // return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({msg: "Usuario no autorizado"})

    // return req.user ? res.status(200).send(req.user) : res.status(401).send('Usuario no autorizado')
    if (req.isAuthenticated()) {
        res.status(200).send("Esta autorizado")
    } else {
        res.status(401).send('No autorizado')
    }
})

module.exports = router;