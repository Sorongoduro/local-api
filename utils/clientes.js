const request = require('postman-request')

const BASE_URL = 'https://local-api-822e4889e0cf.herokuapp.com'

getAllClients = (callback) => {
    request(`${BASE_URL}/clients`, (err, res, body) => {
        let parseClient = JSON.parse(body)
        callback(parseClient)
    })
}

module.exports = {getAllClients}