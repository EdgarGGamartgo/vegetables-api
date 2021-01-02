const express = require('express');
var cors = require('cors')
const Product = require('./models/Product');
const Producto = require('./models/Producto');
const Venta = require('./models/Venta');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database');
const { Op } = require('sequelize')
const app = express();
var jsonParser = bodyParser.json()
app.use(cors())
app.use(jsonParser)
var invNum = require('invoice-number')

const port = 3001;

app.get('/status',  async (req, res) =>  {
      await Product.create({
        title: 'Jitomate',
        price: 80,
        imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
        description: 'Saladed'
      })
    console.log('FINALLY')
        
    const jitomates = await Product.findAll()
    console.log('jitomates: ', jitomates)
    res.send({status: "I'm alive with CORS access and database!", data: jitomates})
});

app.post('/products/create', async (req, res) =>  {
console.log('Reading request: ', req)
const inventario = req.body
console.log('body: ', req.body)
req.body.data.splice(0, 1);
const result = Promise.all(
  req.body.data.map(async (p) => {
    return await Producto.create({
      id_producto: p[0],
      clave_producto: p[1],
      nombre_producto: p[2],
      unidad: p[3],
      contenido: p[4],
      id_grupo: p[5],
      nombre_grupo: p[6], 
      existencia: p[7],
      existencia_minima: p[8], 
      existencia_maxima: p[9],
      costo: p[10],
      venta_menudeo: p[11], 
      venta_mayoreo: p[12],
      importe_menudeo: p[13],
      importe_mayoreo: p[14],
      id_proveedor: p[15],
      nombre_proveedor: p[16],
      control: p[17],
      imagen: p[18]
    })
  })
)
res.send({status: 201, data: result})
});

app.get('/report/products', async (req, res) =>  {
  const products = await Producto.findAll()
  res.send({status: 200, data: products})
});

app.get('/products', async (req, res) =>  {
  const products = await Producto.findAll({
    where: {
      existencia: {
        [Op.gt]: 0
      }
    }
  })
  console.log('Products greater than 0: ', products)
  res.send({status: 200, products})
});

// Invoice number

app.get('/invoice', async (req, res) => {
  const invoice = await Venta.findOne({
    order: [ [ 'createdAt', 'DESC' ]],
    raw: true

  },
  );
  console.log('invoice: ', invoice)
  const defaultInvoice = invoice && invoice.id_venta
  res.send({ status: 200, invoice: `F${defaultInvoice ? invoice.id_venta + 1 : 1}` })
})

app.post('/invoice/create', async (req, res) => {
  const invoice = await Venta.create(req.body,
  {
    raw: true
  });
  console.log('invoice: ', invoice)
  res.send({ status: 201, invoice })
})

app.post('/sale/create', async (req, res) => {
  try {
    const sales = await db.transaction(async (t) => {
      return await Promise.all(
        req.body.map(async(e) => {
          const foundRecord = await Producto.findByPk(e.id_producto)
          await foundRecord.update({
            existencia: foundRecord.existencia - e.order
          }, {
            where: {
              id_producto: e.id_producto
            },
            returning: true,
            transaction: t
          });
          return await Venta.create({
            folio: e.folio,
            nombre_producto: e.nombre_producto,
            unidad: e.unidad,
            costo_unidad: e.costo_unidad,
            importe_producto: e.importe_producto,
            importe_total: e.importe_total
          }, {
            transaction: t
          });    
        })
      )
    });
    res.send({ status: 201, sales })
  } catch (error) {
    console.log("Error when saving sales")
  }
  // req.body = { 
  //   id_producto,
  //   order,
  //   folio,
  //   nombre_producto,
  //   unidad,
  //   costo_unidad,
  //   importe,
  //   importe_total,
  // }   
})

// SEED

db.sync({ force: true }).then(result => {
    console.log(result)
    app.listen(port, () => console.log(`Example app listening on port ${port}, GANBAREYO DESU NE!!`))
}).catch(err => {
    console.log(err)
})

//

