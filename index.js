const express = require('express');
var cors = require('cors')
const Product = require('./models/Product');
const Producto = require('./models/Producto');
const Usuario = require('./models/Usuario');
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
        
    const jitomates = await Product.findAll()
    res.send({status: "I'm alive with CORS access and database!", data: jitomates})
});

app.post('/products/create', async (req, res) =>  {
if (req.body.password === '291d7bbe-4fc0-11eb-ae93-0242ac130002') {
try {
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
} catch (e) {
  res.status(500).send({status: 500, msg: 'Internal error'})
}
} else {
  res.status(400).send({status: 400, msg: 'Contraseña incorrecta'})
}

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
  res.send({status: 200, products})
});

// Invoice number

app.get('/invoice', async (req, res) => {
  const invoice = await Venta.findOne({
    order: [ [ 'createdAt', 'DESC' ]],
    raw: true

  },
  );
  const defaultInvoice = invoice && invoice.id_venta
  res.send({ status: 200, invoice: `F${defaultInvoice ? invoice.id_venta + 1 : 1}` })
})

app.post('/invoice/create', async (req, res) => {
  const invoice = await Venta.create(req.body,
  {
    raw: true
  });
  res.send({ status: 201, invoice })
})

app.post('/sale/create', async (req, res) => {
  try {
    const { products, userData } = req.body
    const sales = await db.transaction(async (t) => {
      return await Promise.all(
        products.map(async(e) => {
          const foundRecord = await Producto.findByPk(e.id_producto)
          if (e.order <= foundRecord.existencia) {
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
          } else {
              //throw new Error(`Lo sentimos, ya no tenemos disponible ${e.order} ${e.unidad} de ${e.nombre_producto}.`)
              console.log(`Lo sentimos, ya no tenemos disponible ${e.order} ${e.unidad} de ${e.nombre_producto}.`)
              res.status(400).send({ status: 400, error: {
                msg: `Lo sentimos, ya no tenemos disponible ${e.order} ${e.unidad} de ${e.nombre_producto}.`,
                order: e.order,
                unidad: e.unidad,
                nombre_producto: e.nombre_producto
              }})
          }
        })
      )
    });
    const user = await Usuario.create({
      nombre: userData.name,
      apellido_paterno: userData.lastName,
      apellido_materno: userData.secondLastName,
      telefono: userData.phone,
      email: userData.email,
      calle: userData.street,
      colonia: userData.town,
      ciudad: userData.city,
      estado: userData.state,
      codigo_postal: userData.zip,
      folio: products[0].folio,
      rol: "CLIENTE"
    })
    res.send({ status: 201, sales, user })
  } catch (error) {
    console.log("Error when saving sales: ")
  }
})

db.sync({ force: true }).then(result => {
    app.listen(port, () => console.log(`Example app listening on port ${port}, GANBAREYO DESU NE!!`))
}).catch(err => {
    console.log(err)
})

//

