import express from 'express'
import { Venta } from './../models/Venta'

const router = express.Router()

router.put('/update/sale', async (req, res) => {
    const { folio, visible } = req.body
    try {
        console.log('Request: ', folio, visible)
        const sale = await Venta.update({ isVisible: visible }, {
          where: {
            folio: folio
          },
          returning: true,
        })
        console.log('Response: ', sale[1])
        return res.send(sale)
    } catch(e) {
        console.log('Error when updating sale: ', e)
    }
    
  })

export { router as updateSaleRouter }
