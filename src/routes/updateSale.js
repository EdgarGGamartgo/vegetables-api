import express from 'express'
import { Venta } from './../models/Venta'

const router = express.Router()

router.get('/update/sale', async (req, res) => {
    const { folio, visible } = req.body
    try {
        
    } catch(e) {
        console.log('Error when updating sale: ', e)
    }
    
  })

export { router as validatePurchaseRouter }
