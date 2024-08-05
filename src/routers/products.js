const express = require('express')
const Product = require('../models/products')
const xlsx = require('xlsx')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})


const router = express.Router()

router.get('/productos', (req, res) => {
    Product.find().sort({ nombre: 1 })
        .then((products) => {
            res.send(products)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/producto', (req, res) => {
    console.log(req.body)
    const product = new Product(req.body)
    product.save()
        .then(() => {
            res.send(product)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})


router.post('/importar-modelo', (req, res) => {

    const headers = {
        SKU: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'],
        codigo_barra: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'],
        id: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'], 
        nombre: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'],
        unidad_medida: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'],
        compra: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'],
        venta: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'],
        cantidad: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'],
        cantidad_minima: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'],
        categoria: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1']
    }
    
    const modify = { "!ref": "A1:J1" };
    
    let cont = 0
    Object.keys(headers).forEach(el => {
        console.log('Elemento header: ' + el)
        Object.keys(req.body).forEach(element => {
            console.log('Elemento body: ' + element)
            if (element === el && req.body[element] !== '') {
                let indexCol = headers[el][cont]
                console.log('Index: ' + indexCol)
                modify[indexCol] = {t: 's', v: element, r: `<t>${element}</t>`, h: element, w: element } 
                cont += 1   
            }
        })
    })
    
    const colLetters = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'];

    modify['!ref'] = `A1:${colLetters[cont-1]}`

    
    modifyTemp = modify

})

router.post('/importar', upload.single('file'), (req, res) => {

    const modify = modifyTemp

    if(!modify) {
        console.log('Primero carga el modelo')
    }
    const workbook = xlsx.readFile(`uploads/${req.file.filename}`)
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]



    Object.keys(modify).forEach(cell => {
        if(cell !== '!ref') {
            worksheet[cell] = modify[cell]
        }
    })

    const jsa = xlsx.utils.sheet_to_json(worksheet);
    jsa.forEach(el => {
        const product = new Product(el)
        product.save()
            .then(() => {
                console.log(product)
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    })
    res.redirect('/')
 
})

router.delete('/producto', (req, res) => {
    const product = req.body
    Product.findOneAndDelete()
        .then(product)
        .then(res.send(`Producto eliminado: ${product}`))
        
})

router.delete('/producto', (req, res) => {
    const { name } = req.body;
    Product.findOneAndDelete({name})
        .then(product => {
            res.status(200).json(product);
        })
})

router.post('/producto', (req, res) => {
    const { name } = req.body;
    Product.findOne({ name })
        .then(product => {
            res.status(200).json(product);
        })
});

router.put('/producto/', (req, res) => {
    const value = req.body
    const update = {
        venta: value.venta,
        cantidad: value.cantidad,
        contador: value.contador
    }
    const filterByName = {
        nombre: value.nombre
    }
    Product.updateMany(filterByName, update)
        .then(res.send(`Id actualizado: ${value}`))
})



// router.put('/producto-cantidad/', (req, res) => {
//     const value = req.body
//     const quantUpdate = {
//         quantity: value.quantity
//     }
//     const filterByName = {
//         name: value.name
//     }
//     Product.findOneAndUpdate(filterByName, quantUpdate, {
//         new: true
//     })
//         .then(res.send(`Id actualizado: ${value}`)) 
// })


module.exports = router