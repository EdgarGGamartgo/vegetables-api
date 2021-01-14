import express from 'express'
import { Producto } from './../models/Producto'
import { Op } from 'sequelize'

const router = express.Router()

router.get('/minimums/products', async (req, res) =>  {
    const products = await Producto.findAll()
    const minumumProducts = products.filter(product => product.existencia <= product.existencia_minima)

    res.status(200).send(minumumProducts)
});

export  { router as downloadMinRouter }
