const productosVendidosCtn = document.querySelector('.productos-vendidos')
const productosVendidos = document.querySelector('.producto-vendido')
const totalVendidosCtn = document.querySelector('.total-vendidos')
const totalVendidos = document.querySelector('.total-vendido')
const promedioCtn = document.querySelector('.promedio-text')
const promedioVentas = document.querySelector('.promedio-ventas')


async function calcularPromedio() {
    try {
        let valorProductosVendidos = parseInt(productosVendidosCtn.getAttribute('data-cont'))
        let valorTotalVendido = parseInt(totalVendidosCtn.getAttribute('data-total'))
        let promedio = valorTotalVendido / valorProductosVendidos
        promedioVentas.textContent = `$${parseFloat(promedio).toFixed(2)}`;
    }
        catch {
            console.log('Error')
        }
    }

calcularPromedio()