import express from 'express'
import { Producto } from './../models/Producto'
import { Op } from 'sequelize'

const router = express.Router()

router.get('/products', async (req, res) =>  {
    const products = await Producto.findAll({
      where: {
        existencia: {
          [Op.gt]: 0
        }
      }
    })
    res.send({status: 200, products})
  });

export { router as productsRouter }
