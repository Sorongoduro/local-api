const form = document.querySelector('.register-form')
const url = 'https://local-api-822e4889e0cf.herokuapp.com/register'

form.addEventListener('submit', e => {
    e.preventDefault()
    const userData = new FormData(form)
    const userDataJson = Object.fromEntries(userData)
    console.log(userDataJson)
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(userDataJson),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => console.log('Success', res))
    .catch(error => console.log('Error', error))
})

