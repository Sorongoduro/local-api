const loginForm = document.querySelector('.login-form')
const url = 'https://local-api-822e4889e0cf.herokuapp.com/auth'

loginForm.addEventListener('submit', e => {
    e.preventDefault()
    const loginData = new FormData(loginForm)
    const loginDataJson = Object.fromEntries(loginData)
    console.log(loginDataJson)
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginDataJson),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })
    .then(res => window.location.replace('/'))
    .catch(error => console.log('Error', error))
})

