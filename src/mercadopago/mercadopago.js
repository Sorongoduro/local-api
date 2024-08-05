const { MercadoPagoConfig, Payment } = require('mercadopago')

const client = new  MercadoPagoConfig({accessToken: 'TEST-5863008391043316-072817-3f530e9d93f2163a36c309a3e171698f-410504169', options: {timeout: 5000, idempotencyKey: 'abc'}})

const payment = new Payment(client)

payment.search()
    .then((pagos) => {
        console.log(pagos)
    })

