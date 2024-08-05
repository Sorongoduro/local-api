const modelForm = document.querySelector('.model-xlsx')

modelForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const modelData = new FormData(modelForm)
    const modelDataJson = Object.fromEntries(modelData)
    console.log(modelDataJson)
    fetch(`https://local-api-822e4889e0cf.herokuapp.com/importar-modelo`, {
        method: 'POST',
        body: JSON.stringify(modelDataJson),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => console.log('Success', res))
    .catch(error => console.log('Error', error))
})
