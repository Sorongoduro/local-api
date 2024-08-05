const putForm = document.querySelector('.put-form')

putForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const putInput = document.querySelector('.name-input').value
    const capital = putInput.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const putData = new FormData(putForm)
    const putDataJson = Object.fromEntries(putData)
    putDataJson.nombre = capital
    putDataJson.venta = parseInt(putDataJson.venta)
    putDataJson.cantidad = parseInt(putDataJson.cantidad)

    function updateProductName () {
        fetch('https://local-api-822e4889e0cf.herokuapp.com/producto', {
            method: 'PUT',
            body: JSON.stringify({nombre: putDataJson.nombre}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function updateProduct () {
        fetch(`https://local-api-822e4889e0cf.herokuapp.com/producto`, {
            method: 'PUT',
            body: JSON.stringify(putDataJson),
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }

    if(isNaN(putDataJson.venta)) {
        updateProductName()
        .then(producto => {
            const precioOriginal = producto.venta
            putDataJson.venta = precioOriginal
            console.log(putDataJson)
            return updateProduct()
        })
    } else if (isNaN(putDataJson.cantidad)) {
        updateProductName()
        .then(producto => {
            const cantidadOriginal = producto.cantidad
            putDataJson.cantidad = cantidadOriginal
            console.log(putDataJson)
            return updateProduct()
        })
    }  else {
        console.log(putDataJson)
        updateProduct()
    }
})
