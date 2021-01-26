import express from 'express'
import { Producto } from './../models/Producto'
import { Op } from 'sequelize'

const router = express.Router()

router.get('/product/:name', async (req, res) =>  {
    const { name } = req.params
    const product = await Producto.findOne({
      where: {
        nombre_producto: name.toUpperCase()
      },
      //attributes: ['id_producto', 'nombre_producto', 'unidad', '']
    })
    res.send({status: 200, product})
  });

export { router as productByNameRouter }
