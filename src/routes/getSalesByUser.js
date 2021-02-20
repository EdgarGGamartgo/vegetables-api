import express from 'express'
import { GetSalesByUserService, GetDeletedSalesByUserService } from './../services/getSalesByUserService'

const router = express.Router()

router.get('/sales/user', async (req, res) => {

    try {
        const salesUser = await GetSalesByUserService()
        res.send(salesUser)
    } catch(e) {
        res.status(500).send('Error al ejecutar query salesByUser')
    }
    
  })

router.get('/sales/deleted', async (req, res) => {

    try {
        const salesUser = await GetDeletedSalesByUserService()
        res.send(salesUser)
    } catch(e) {
        res.status(500).send('Error al ejecutar query salesByUser')
    }
    
  })

export { router as salesByUserRouter }
