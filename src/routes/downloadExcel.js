import express from 'express'
import { Producto } from './../models/Producto'

const router = express.Router()

router.get('/report/products', async (req, res) =>  {
    const products = await Producto.findAll()
    res.send({status: 200, data: products})
  });

export  { router as downloadRouter }
