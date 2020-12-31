const express = require('express');
var cors = require('cors')
const Product = require('./models/Product');
const Producto = require('./models/Producto');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database');
const { Op } = require('sequelize')
const app = express();
var jsonParser = bodyParser.json()
app.use(cors())
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

app.post('/products/create', jsonParser, async (req, res) =>  {
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

app.get('/report/products', jsonParser, async (req, res) =>  {
  const products = await Producto.findAll()
  res.send({status: 200, data: products})
});

app.get('/products', jsonParser, async (req, res) =>  {
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

// SEED

db.sync({ force: true }).then(result => {
    console.log(result)
    app.listen(port, () => console.log(`Example app listening on port ${port}, GANBAREYO DESU NE!!`))
}).catch(err => {
    console.log(err)
})

//

