const productsInput = document.querySelector('.product-search');
const productName = document.querySelectorAll('.product-name');
const cards = document.querySelectorAll('.card-product');
const addBtn = document.querySelectorAll('.add-btn');
const cart = document.querySelector('.cart');
const productosVendidosCtn = document.querySelector('.productos-vendidos')
const productosVendidos = document.querySelector('.producto-vendido')
const totalVendidosCtn = document.querySelector('.total-vendidos')
const totalVendidos = document.querySelector('.total-vendido')
const promedioCtn = document.querySelector('.promedio-text')
const cartTitle = document.querySelector('.cart-title')
const cartTypes = document.querySelector('.cart-types')
const promedioVentas = document.querySelector('.promedio-ventas')
const editQuantBtn = document.querySelectorAll('.edit-quantity')
const editPriceBtn = document.querySelectorAll('.edit-price')

const clientCtn = document.querySelector('.client-item-ctn')
const clientSearch = document.querySelector('.client-search')
const clientItems = document.querySelectorAll('.client-item')
const radioInputs = document.getElementsByName('metodo')



const balanceInput = document.querySelector('.balance')
const balanceInputBtn = document.querySelector('.balance-btn')

document.addEventListener('DOMContentLoaded', () => {
    const priceElement = document.querySelectorAll('.price-element');
    priceElement.forEach(el => {
        const number = parseInt(el.textContent);
        if (!isNaN(number)) {
            const formattedNumber = number.toLocaleString('es-AR'); 
            el.textContent = `$${formattedNumber}`;
        }
    });
});


// Actualizar Promedio

async function updateCont(contOriginal, cont, totalOriginal, total) {
    try {
        const response = await fetch('https://local-api-822e4889e0cf.herokuapp.com/contador', {
            method: 'PUT',
            body: JSON.stringify({contador: contOriginal + cont, total: totalOriginal + total}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error actualizando producto:', error);
    }
}

async function updateBalanceByName(nombre, realBalance, balance) {
    try {
        const response = await fetch('https://local-api-822e4889e0cf.herokuapp.com/cliente-nombre', {
            method: 'PUT',
            body: JSON.stringify({nombre: nombre, fiado: realBalance - balance}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error actualizando valor')
    }
}

async function addBalanceByName(nombre, realBalance, balance) {
    try {
        const response = await fetch('https://local-api-822e4889e0cf.herokuapp.com/cliente-nombre', {
            method: 'PUT',
            body: JSON.stringify({nombre: nombre, fiado: realBalance + balance}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error actualizando valor')
    }
}

async function updateBalanceBySurname(apellido, realBalance, balance ) {
    try {
        const response = await fetch('https://local-api-822e4889e0cf.herokuapp.com/cliente-apellido', {
            method: 'PUT',
            body: JSON.stringify({apellido: apellido, fiado: realBalance - balance}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error actualizando valor')
    }
}

async function addBalanceBySurname(apellido, realBalance, balance ) {
    try {
        const response = await fetch('https://local-api-822e4889e0cf.herokuapp.com/cliente-apellido', {
            method: 'PUT',
            body: JSON.stringify({apellido: apellido, fiado: realBalance + balance}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error actualizando valor')
    }
}

// const cartTitle = document.createElement('h2');
// cart.appendChild(cartTitle);
// cartTitle.innerHTML = 'Lista de productos:';



// Definicion del total y el vuelto

const changeInput = document.createElement('input')
changeInput.classList.add('change-input')
changeInput.placeholder = 'Importe del cliente'
changeInput.type = 'number'
changeInput.min = 1
cart.appendChild(changeInput)
changeInput.style.display = 'none'

const totalCtn = document.createElement('div')
totalCtn.classList.add('total-ctn')

const totalPrice = document.createElement('p');
totalPrice.classList.add('total')

const totalReturned = document.createElement('p');
totalReturned.classList.add('change')

totalPrice.style.fontSize = '28px'
totalReturned.style.fontSize = '28px'

totalPrice.style.display = 'inline-block'
totalReturned.style.display = 'inline-block'

totalPrice.style.width = '200px'
totalReturned.style.width = '200px'

totalCtn.appendChild(totalPrice);
totalCtn.appendChild(totalReturned);
cart.appendChild(totalCtn)
let total = 0;
let change = 0;
totalPrice.innerHTML = `<strong>Total:</strong> $${total}`;
totalReturned.innerHTML = `<strong>Vuelto:</strong> $${change}`;

// Contador de productos

let cont = 0

// Declarar promedio

let valorProductosVendidos = parseInt(productosVendidosCtn.getAttribute('data-cont'))
let valorTotalVendido = parseInt(totalVendidosCtn.getAttribute('data-total'))
let promedio = valorTotalVendido / valorProductosVendidos


// Objeto para rastrear los productos en el carrito
const cartProducts = {};

// Cola de operaciones
const operationQueue = [];
let isProcessing = false;


// Función para procesar la cola de operaciones
async function processQueue() {
    if (isProcessing || operationQueue.length === 0) return;

    isProcessing = true;
    const operation = operationQueue.shift();
    await operation();
    isProcessing = false;
    processQueue();
}

// Editar Cantidad

async function updateProduct(productName, quantity) {
    try {
        const response = await fetch('https://local-api-822e4889e0cf.herokuapp.com/producto', {
            method: 'PUT',
            body: JSON.stringify({nombre: productName, cantidad: quantity}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
        console.error('Error updating product:', error);
    }
}

// Editar Precio

async function updateProductPrice(productName, price) {
    try {
        const response = await fetch('https://local-api-822e4889e0cf.herokuapp.com/producto', {
            method: 'PUT',
            body: JSON.stringify({nombre: productName, venta: price}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
        console.error('Error updating product:', error);
    }
}


async function handleFinishClick(e) {
    e.preventDefault();
    if (e.target.disabled) return;
    e.target.disabled = true;

    radioInputs.forEach(async radio => {
        if (radio.checked) {
            const filteredName = clientSearch.value
            if (radio.value === 'Cuenta Corriente' && filteredName !== '') {
                for (const item of clientItems) {
                    const splitName = item.innerText.split(' ')
                    const filteredSplitName = filteredName.split(' ')
                    if (splitName[1] !== '' && item.innerText === filteredName) {   
                        console.log("Filtrado: " + filteredName)
                        let realBalance = parseInt(item.getAttribute('data-balance'))
                        const surname = splitName[1]
                        item.setAttribute('data-balance', realBalance + total);
                        await addBalanceBySurname(surname, realBalance, total)
                    } else if (!splitName[1] && splitName[0] === filteredName) {
                        console.log("Filtrado: " + filteredName)
                        let realBalance = parseInt(item.getAttribute('data-balance'))
                        const name = splitName[0]
                        console.log(name)
                        item.setAttribute('data-balance', realBalance + total);
                        await addBalanceByName(name, realBalance, total)
                       
                    }
                }
            } else if (radio.value === 'Contado') {
                await updateCont(valorProductosVendidos, cont, valorTotalVendido, total);
                let resultadoTotalVendido = valorTotalVendido + total;
                let resultadoProductosVendidos = valorProductosVendidos + cont;
                valorProductosVendidos = resultadoProductosVendidos
                valorTotalVendido = resultadoTotalVendido
            }
        }
    });
    
    



 

    total = 0;
    change = 0
    cont = 0;
    changeInput.value = ''
    for (let productName in cartProducts) {
        const card = Array.from(document.querySelectorAll('.card-product')).find(card =>
            card.querySelector('.product-name').textContent.trim() === productName)
        const productQuantElement = card.querySelector('.quantity-element');
        
        let productData = cartProducts[productName];
        let finalQuantity = productData.realQuantity !== undefined ? productData.realQuantity : productData.updatedQuantity;
        console.log(cartProducts[productName])
        await updateProduct(productName, finalQuantity);
        productQuantElement.textContent = `${finalQuantity}`
        delete cartProducts[productName];
    }


    updateCartDisplay()
    
}


// Actualizar Carrito

function updateCartDisplay() {
    cart.textContent = '';
    cart.appendChild(cartTitle);
    cart.appendChild(cartTypes)



    for (const [name, data] of Object.entries(cartProducts)) {

        const cartProductDiv = document.createElement('div');
        cartProductDiv.classList.add('product-ctn', 'card', 'rounded-0')
        const cartProduct = document.createElement('p');
        const cartPrice = document.createElement('p');
        const cartQuantity = document.createElement('p');
        cartQuantity.classList.add('cart-quantity')
        cartProduct.innerHTML = `${name}`;
        cartPrice.innerHTML = `$${parseInt(data.venta).toLocaleString('es-AR')}`;
        cartQuantity.innerHTML = `${data.cantidad}`;
        cartProductDiv.appendChild(cartProduct);
        cartProductDiv.appendChild(cartPrice);
        cartProductDiv.appendChild(cartQuantity);

        const inputUpdate = document.createElement('input')
        inputUpdate.type = 'number'
        inputUpdate.style.width = '70px'
        inputUpdate.placeholder  = 'Editar'
        cartProductDiv.appendChild(inputUpdate)
        handleEdit(name, data, inputUpdate)


        // const editBtn = document.createElement('a');
        // editBtn.innerHTML = 'Editar';
        // editBtn.href = '';
        // editBtn.classList.add('bttn')
        // cartProductDiv.appendChild(editBtn);

        const delProductBtn = document.createElement('a');
        delProductBtn.innerHTML = 'Eliminar';
        delProductBtn.href = '';
        delProductBtn.classList.add('bttn')
        cartProductDiv.appendChild(delProductBtn);

        delProductBtn.addEventListener('click', (e) => handleProductDelete(e, name))
        cart.appendChild(cartProductDiv);
    }
    
    cart.appendChild(changeInput)
    if (Object.keys(cartProducts).length > 0) {
        changeInput.style.display = 'block';
    } else {
        changeInput.style.display = 'none';
    }



    changeInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            let changeInputValue = parseInt(changeInput.value)
            if (changeInputValue > total) {
                console.log(changeInputValue)
                change = changeInputValue - total
                totalReturned.innerHTML = `<strong>Vuelto:</strong> $${change.toLocaleString('es-AR')}`
            }
        }
    })

    cart.appendChild(totalCtn)
    totalPrice.innerHTML = `<strong>Total:</strong> $${total.toLocaleString('es-AR')}`;
    totalReturned.innerHTML = `<strong>Vuelto:</strong> $${change.toLocaleString('es-AR')}`;
    // totalPrice.style.display = Object.keys(cartProducts).length > 0 ? 'block' : 'none';

    const finishBtn = document.createElement('a')
    finishBtn.innerHTML = 'Aceptar'
    finishBtn.href = ''
    finishBtn.style.marginRight = '20px'
    finishBtn.classList.add('bttn')


    const delBtn = document.createElement('a');
    delBtn.innerHTML = 'Eliminar todo';
    delBtn.href = '';
    delBtn.classList.add('bttn')
    
    finishBtn.style.display = Object.keys(cartProducts).length > 0 ? 'inline-block' : 'none';
    delBtn.style.display = Object.keys(cartProducts).length > 0 ? 'inline-block' : 'none';
    cart.appendChild(finishBtn);
    cart.appendChild(delBtn);
    
    finishBtn.addEventListener('click', handleFinishClick)
    delBtn.addEventListener('click', (e) => handleDelete(e))

    }

// Eliminar un producto del carrito

function handleProductDelete(e, name) {
    e.preventDefault()
    let parsedData = parseInt(cartProducts[name].venta)
    total -= parsedData*cartProducts[name].cantidad
    change = 0
    changeInput.value = ''
    delete cartProducts[name]
    updateCartDisplay()
}

// Eliminar carrito

function handleDelete(e) {
    e.preventDefault()

    for (let productName in cartProducts) {
        total = 0
        change = 0
        cont = 0
        changeInput.value = ''
        delete cartProducts[productName]

    }
    updateCartDisplay()
}

// Edicion del producto en el carrito

function handleEdit(productName, data, inputUpdate) {
    const card = Array.from(document.querySelectorAll('.card-product')).find(card =>
        card.querySelector('.product-name').textContent.trim() === productName)

    const productQuantElement = card.querySelector('.quantity-element');
    let textQuantity = parseInt(productQuantElement.textContent);
    let realQuantity = textQuantity - data.cantidad

    operationQueue.push(async () => {
        if (cartProducts[productName].cantidad >= 1) {
            inputUpdate.addEventListener('keypress', e => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    let inputUpdateValue = parseInt(inputUpdate.value)
                    if (inputUpdateValue <= textQuantity && inputUpdateValue > 0) {
                        if (inputUpdateValue < cartProducts[productName].cantidad) {
                            let contSubstract = cartProducts[productName].cantidad - inputUpdateValue
                            realQuantity += contSubstract
                            cont -= contSubstract
                            total -= parseInt(data.venta)*contSubstract;
                            console.log("Cantidad a actualizar: " + realQuantity)
                            console.log(cont)
                            cartProducts[productName].realQuantity = realQuantity;
                        } else {
                            let contSum = inputUpdateValue - cartProducts[productName].cantidad
                            realQuantity -= contSum
                            console.log("Cantidad inicial - input", contSum)
                            cont += contSum
                            total += parseInt(data.venta)*contSum;
                            console.log("Cantidad a actualizar: " + realQuantity)
                            console.log(cont)
                            cartProducts[productName].realQuantity = realQuantity;
                        }
                        
                        
                        cartProducts[productName].cantidad = inputUpdateValue;
                        updateCartDisplay();
                    } else {
                        console.error('El valor es demasiado alto')
                    }
                }
            })
        } else {
            delete cartProducts[productName];
        }
    });
    processQueue();
}

// Funcion para agregar producto al carrito

addBtn.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        if (button.disabled) return;
        button.disabled = true;
        const addBtnCtn = button.closest('.add-btn-ctn');
        const productQuantElement = addBtnCtn.parentElement.querySelector('.quantity-element');
        const productPriceElement = addBtnCtn.parentElement.querySelector('.price-element');
        realQuantity = parseInt(productQuantElement.textContent);
        const productName = button.getAttribute('data-name');


        if (realQuantity > 0) {
            let inputQuantity = addBtnCtn.querySelector('input');
            const inputQuantityBtn = addBtnCtn.querySelector('.quantity-btn')
            console.log(inputQuantityBtn)
            if (!inputQuantity) {
                const inputQuantity = document.createElement('input');
                inputQuantity.classList.add('input-addquantity')
                inputQuantityBtn.style.display = 'block'
                inputQuantity.style.display = 'block'
                inputQuantity.min = '1';
                inputQuantity.max = realQuantity;
             
                addBtnCtn.appendChild(inputQuantity);
                addBtnCtn.appendChild(inputQuantityBtn);

                const handleQuantityInput = () => {
                    const productPrice = productPriceElement.getAttribute('data-price');
                    let abstractQuantity = parseInt(inputQuantity.value)
                    if (!isNaN(abstractQuantity) && realQuantity >= abstractQuantity && abstractQuantity > 0) {
                        cont += abstractQuantity
                        let updatedQuantity = realQuantity - abstractQuantity
                        console.log(productPrice)
                        console.log(`${realQuantity} - ${abstractQuantity} = ${updatedQuantity}`)
                        operationQueue.push(async () => {
                            if (productName in cartProducts) {
                                cartProducts[productName].cantidad += abstractQuantity;
                            } else {
                                cartProducts[productName] = {
                                    venta: productPrice,
                                    cantidad: abstractQuantity
                                };
                                cartProducts[productName].updatedQuantity = updatedQuantity
                                console.log(cartProducts[productName])
                            }
                            total += parseInt(productPrice*abstractQuantity);
                            realQuantity = parseInt(productQuantElement.textContent)
                            updateCartDisplay();
                           
                        });
                    } else {
                        console.error('No hay suficiente stock o el valor no es numerico')
                    }

                    processQueue()
                    
                    inputQuantityBtn.style.display = 'none'
                    inputQuantity.style.display = 'none'
                    inputQuantity.value = ''
                }
                

                inputQuantity.addEventListener('keypress', e => {
                    if (e.key === 'Enter') {
                        handleQuantityInput()
                    }
                })

                inputQuantityBtn.addEventListener('click', e => {
                    e.preventDefault()
                    inputQuantity.style.display = 'none'
                    inputQuantityBtn.style.display = 'none' 
                    handleQuantityInput();
                })
                inputQuantity.focus();
            } else {
                inputQuantityBtn.style.display = 'block'
                inputQuantity.style.display = 'block'
                inputQuantity.focus();
            }
        } else {
            console.log("No hay suficiente producto");
        }
        button.disabled = false;
    });
});

// Funcion para editar la cantidad

editQuantBtn.forEach(editButton => {
    const inputEditQuant  = document.createElement('input');
    const editChangeQuant  = editButton.nextElementSibling
    inputEditQuant.style.display = 'none';
    
    inputEditQuant.placeholder = 'Cantidad';
    
    

    const quantityCtn = editButton.closest('.quantity-ctn');
    quantityCtn.appendChild(inputEditQuant);
    inputEditQuant.insertAdjacentElement('afterend', editChangeQuant);
    

    editButton.addEventListener('click', e => {
        e.preventDefault();

        editButton.style.display = 'none'
        inputEditQuant.style.display = 'block';
        if(window.innerWidth >= 1440) {
        inputEditQuant.style.width = '40%';
        editChangeQuant.style.display = 'block';
        } else {
            inputEditQuant.style.width = '50%';
        }
        inputEditQuant.focus();

    });
        editChangeQuant.addEventListener('click', e => {
            e.preventDefault();
            const card = editButton.closest('.card-product');
            const editQuantName = editButton.getAttribute('data-name');
            const inputEditValue = parseInt(inputEditQuant.value)
            if (isNaN(inputEditValue)) {
                console.error('Input value is not a valid number');
                inputEditQuant.style.display = 'none';
                editChangeQuant.style.display = 'none';
                editButton.style.display = 'inline-block'
                return;
            }
            updateProduct(editQuantName, inputEditValue)
            const productQuantElement = card.querySelector('.quantity-element');
            productQuantElement.textContent = inputEditValue
            inputEditQuant.value = ''
            editButton.style.display = 'inline-block'
            inputEditQuant.style.display = 'none';
            editChangeQuant.style.display = 'none';
        });
    

    inputEditQuant.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            editChangeQuant.click();
        }
    });
})

// Funcion para editar el precio

editPriceBtn.forEach(editButton => {
    const inputEditPrice  = document.createElement('input');
    const editChangePrice  = editButton.nextElementSibling
    inputEditPrice.style.display = 'none';
    
    inputEditPrice.placeholder = 'Precio';
    
    
    const priceCtn = editButton.closest('.price-ctn');
    priceCtn.appendChild(inputEditPrice);
    inputEditPrice.insertAdjacentElement('afterend', editChangePrice);
    

    editButton.addEventListener('click', e => {
        e.preventDefault();
        editButton.style.display = 'none'
        inputEditPrice.style.display = 'block';

        if(window.innerWidth >= 1440) {
            inputEditPrice.style.width = '40%';
            editChangePrice.style.display = 'block';
            } else {
                inputEditPrice.style.width = '50%';
            }
        inputEditPrice.focus();

    });
    
editChangePrice.addEventListener('click', e => {
    e.preventDefault();
    const card = editButton.closest('.card-product');
    const editPriceName = editButton.getAttribute('data-name');
    const inputEditValue = parseInt(inputEditPrice.value)
    
    if (isNaN(inputEditValue)) {
        console.error('Input value is not a valid number');
        inputEditPrice.style.display = 'none';
        editChangePrice.style.display = 'none';
        editButton.style.display = 'inline-block'
        return;
    }
    updateProductPrice(editPriceName, inputEditValue)
    const productPriceElement = card.querySelector('.price-element');
    
    productPriceElement.textContent = `$${inputEditValue.toLocaleString('es-AR')}`
    productPriceElement.setAttribute('data-price', inputEditValue)
    inputEditPrice.value = ''
    editButton.style.display = 'inline-block'
    inputEditPrice.style.display = 'none';
    editChangePrice.style.display = 'none';
});

inputEditPrice.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            editChangePrice.click();
        }
    });
})


// Buscador de productos

productsInput.addEventListener('input', event => {
    const inputValue = productsInput.value.toLowerCase();
    
    cards.forEach(card => {
        const productName = card.querySelector('.card-info h4').innerText.toLowerCase();
        if (productName.includes(inputValue)) {
            card.style.display = 'block';
            card.closest('.card').style.display = 'block';
        } else {
            card.style.display = 'none'; 
            card.closest('.card').style.display = 'none'
        }
    });
});

console.log(radioInputs)


const updateClientItems = (shouldShow) => {
    clientItems.forEach(item => {
        item.classList.toggle('show', shouldShow)
    })
}

const filterClientItems = () => {
    const clientInputValue = clientSearch.value.toLowerCase()
    clientItems.forEach(item => {
        const clientName = item.innerText.toLowerCase()
        item.classList.toggle('show', clientName.includes(clientInputValue))
            
    })
}



clientItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        clientSearch.value = item.innerText
        clientSearch.dispatchEvent(new Event('input'))
        item.classList.toggle('show', false)
    })
})


clientSearch.addEventListener('input', filterClientItems)

clientSearch.addEventListener('focus', () => updateClientItems(true))

document.addEventListener('click', (e) => {
    clientItems.forEach(item => {
        if (!item.contains(e.target) && !clientSearch.contains(e.target)) {
            item.classList.toggle('show', false)
        }
    })
});


async function balanceBtnClick (e) {
    e.preventDefault()
    const balanceInputValue = parseInt(balanceInput.value)
    const filteredName = clientSearch.value
    if(!isNaN(balanceInputValue) && filteredName !== '') {
        console.log(filteredName)
        for (const item of clientItems) {
            const splitName = item.innerText.split(' ')
            if (splitName[1] !== '' && item.innerText === filteredName) {   
                let realBalance = parseInt(item.getAttribute('data-balance'))
                const surname = splitName[1]
                item.setAttribute('data-balance', realBalance - balanceInputValue);
                await updateBalanceBySurname(surname, realBalance, balanceInputValue)

            } else if (splitName[1] === '' && item.innerText === filteredName) {
                let realBalance = parseInt(item.getAttribute('data-balance'))
                const name = splitName[0]
                item.setAttribute('data-balance', realBalance - balanceInputValue);
                await updateBalanceByName(name, realBalance, balanceInputValue)
            } 
        }
    } else {
        console.log('Ingresa el cliente y el monto')
    }
}
    
    if (Object.keys(cartProducts).length === 0) {
        balanceInputBtn.addEventListener('click', (e) => balanceBtnClick(e))
    }
