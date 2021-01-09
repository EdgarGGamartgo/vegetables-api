import express from 'express'
import fs from 'fs'
import { invoicePdf } from '../services/invoicePdf'

const router = express.Router()

router.get('/api/download/invoice', async(req, res, next) => {
    try {
        const invoiceFile = await invoicePdf()

        if(invoiceFile) {
            const src = fs.createReadStream('./assets/pedido_aceptado.pdf');
  
            res.writeHead(200, {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment; filename=sample.pdf',
              'Content-Transfer-Encoding': 'Binary'
            });
          
            src.pipe(res); 
        }

    } catch (e) {
        res.status(500)
    }
  });

export  { router as downloadInvoiceRouter }