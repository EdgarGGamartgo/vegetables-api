import { notificationCode } from '../util/notificationCode'
import { mail } from '../util/mail'

export const orderNotification = async(to, subject) => {
    const code = notificationCode()
    const html = `
    <h1>San Martin</h1><p>${code}</p>
    `
    const sentMail = await mail(to, subject, html)
    if(sentMail) {
        return 'Email successfully sent'
    }
    return null
}


