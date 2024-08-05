const postClient = document.querySelector('.post-client')
const url = 'https://local-api-822e4889e0cf.herokuapp.com/cliente'

postClient.addEventListener('submit', e => {
    e.preventDefault()
    const clientData = new FormData(postClient)
    const clientDataJson = Object.fromEntries(clientData)
    clientDataJson.fiado = parseInt(clientDataJson.fiado)
    console.log(clientDataJson)
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(clientDataJson),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => console.log('Success', res))
    .catch(error => console.log('Error', error))
})

