const request = require('postman-request')

const BASE_URL = 'https://local-api-822e4889e0cf.herokuapp.com'

getAllUsers = (callback) => {
    request(`${BASE_URL}/usuarios`, (err, res, body) => {
        let parseUser = JSON.parse(body)
        callback(parseUser)
    })
}

module.exports = {getAllUsers}