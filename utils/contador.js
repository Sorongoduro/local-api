const request = require('postman-request')

const BASE_URL = 'https://local-api-822e4889e0cf.herokuapp.com'

getContador = (callback) => {
    request(`${BASE_URL}/contador`, (err, res, body) => {
        let parseContador = JSON.parse(body)
        callback(parseContador)
    })
}

module.exports = {getContador}