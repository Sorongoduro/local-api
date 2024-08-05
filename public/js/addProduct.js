const postForm = document.querySelector('.post-form')

const url = 'https://local-api-822e4889e0cf.herokuapp.com/producto'

postForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const updateInputName = document.querySelector('.name-input').value
    const updateInputType = document.querySelector('.type-input').value
    const capitalName = updateInputName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    const capitalType = updateInputType.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    const postData = new FormData(postForm)
    const postDataJson = Object.fromEntries(postData)
    postDataJson.nombre = capitalName
    postDataJson.categoria = capitalType
    postDataJson.sku = parseInt(postDataJson.sku)
    postDataJson.codigo_barra = parseInt(postDataJson.codigo_barra)
    postDataJson.id = parseInt(postDataJson.id)
    postDataJson.compra = parseInt(postDataJson.compra)
    postDataJson.venta = parseInt(postDataJson.venta)
    postDataJson.cantidad = parseInt(postDataJson.cantidad)
    postDataJson.cantidad_minima = parseInt(postDataJson.cantidad_minima)
    console.log(postDataJson)
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(postDataJson),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => console.log('Success', res))
    .catch(error => console.log('Error', error))
})

