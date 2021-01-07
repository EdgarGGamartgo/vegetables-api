import express from 'express'
import { Venta } from './../models/Venta'

const router = express.Router()

router.get('/invoice', async (req, res) => {
    const invoice = await Venta.findOne({
      order: [ [ 'createdAt', 'DESC' ]],
      raw: true
  
    },
    );
    const defaultInvoice = invoice && invoice.id_venta
    res.send({ status: 200, invoice: `F${defaultInvoice ? invoice.id_venta + 1 : 1}` })
  })

export { router as invoiceRouter }
