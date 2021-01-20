import express from 'express'
import { GetSalesByUserService } from './../services/getSalesByUserService'

const router = express.Router()

router.get('/sales/user', async (req, res) => {

    try {
        const salesUser = await GetSalesByUserService()
        res.send(salesUser)
    } catch(e) {
        res.status(500).send('Error al ejecutar query salesByUser')
    }
    
  })

export { router as salesByUserRouter }
