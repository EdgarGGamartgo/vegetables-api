import express from 'express'
import { orderNotification } from '../services/orderNotification'

const router = express.Router()

router.post('/mail', async (req, res) => {
    const { email, subject} = req.body
    const msg = await orderNotification(email, subject)
    if(msg) {
        res.send({ msg })
    } else {
        res.status(400).send({ msg: 'Bad request' })
    }
})

export { router as notificationsRouter }
