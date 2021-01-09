import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import { downloadRouter } from './routes/downloadExcel'
import { invoiceRouter } from './routes/getInvoice'
import { productsRouter } from './routes/getProducts'
import { loadRouter } from './routes/loadExcel'
import { saleRouter } from './routes/sale'
import { notificationsRouter } from './routes/notifications'
import { downloadInvoiceRouter } from './routes/downloadInvoice'

const app = express();
dotenv.config()
app.set('trust proxy', true)
app.use(cookieSession({
    signed: false,
    secure: true
  }))
app.use(cors())
app.options('*', cors());
var jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(downloadInvoiceRouter)
app.use(downloadRouter)
app.use(invoiceRouter)
app.use(productsRouter)
app.use(loadRouter)
app.use(saleRouter)
app.use(notificationsRouter)

app.all('*', async(req, res) => {
    res.status(400).send('This is not a valid route')
})

export { app as default }
