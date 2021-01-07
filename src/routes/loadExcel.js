import express from 'express'
import { Producto } from './../models/Producto'

const router = express.Router()

router.post('/products/create', async (req, res) =>  {
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

export { router as loadRouter }
