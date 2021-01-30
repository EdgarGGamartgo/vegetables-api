import express from 'express'
import { Venta } from './../models/Venta'
import { sequelize } from '../util/database'

const router = express.Router()

router.put('/update/sale/:folio', async (req, res) => {
    const { folio } = req.params
    const { products } = req.body
    try {
        // Find Venta records by folio and delete them
        await Venta.destroy({
          where: {
            folio: folio
          }
        })
        // Insert all req.body objects to Venta table
        const sales = await sequelize.transaction(async (t) => {
          return await Promise.all(
            products.map(async (e) => {
                return await Venta.create(e, {
                  transaction: t
                });
            })
          )
        });
        // Send Successful Update
        
        return res.status(201).send(sales)
    } catch(error) {
        console.log('Error when updating sale: ', error)
        return res.status(500).send('Error when inserting new sales')
    }
})

export { router as updateSaleRouter }
