import express from 'express'
import { Venta } from './../models/Venta'

const router = express.Router()

router.get('/validate/purchase', async (req, res) => {
    const { code, id } = req.query
    try {
        if (id === '2d688560-548e-11eb-ae93-0242ac130002' && code) {
            const purchase = await Venta.findOne({
                where: { codigo_compra: code },
            //    raw: true
              },
            );
            purchase.estatus = "VALIDADA"
            await purchase.save()
            res.status(200).send()
        } else {
            res.status(400).send({ msg: 'Credentials not valid' })
        }
    } catch(e) {
        console.log('Validate Purchase error: ', e)
        res.status(500).send({ msg: 'Internal error' })
    }
    
  })

export { router as validatePurchaseRouter }
