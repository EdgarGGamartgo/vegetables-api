import { notificationCode } from '../util/notificationCode'
import { mail } from '../util/mail'
import formatCurrency from 'format-currency'

let opts = { maxFraction: 2 }
 
const productsHtml = (productos) => {

    let templateHtml = ''

    productos.forEach(product => {
        templateHtml += `
            <div>    
                <li>
                    <h3>${product.order} ${product.unidad} de ${product.nombre_producto}. Precio unitario $ ${Number(product.importe_producto) / Number(product.order)} MXN .Importe $ ${formatCurrency(product.importe_producto, opts)} MXN</h3>
                </li>
            </div>   
        `
    })

    return templateHtml

}

export const orderNotification = async (to, subject, productos) => {
    const productsList = productsHtml(productos)
    const code = notificationCode()
    const html = `
    <h1>San Martin</h1>
    <p>Muchas gracias por su preferencia. Su pedido ha sido recibido y en breve estaremos enviando 
    sus productos a su domicilio. Por favor conserve este codigo de compra ${code}${productos[0].folio}, y folio ${productos[0].folio}
    el cual debera proporcionar al repartidor cuando se le entreguen sus productos.</p>
    <br>
    <p>Su pedido es:</p>
    ${productsList}
    <br>
    <p>Importe total: $ ${formatCurrency(productos[0].importe_total, opts)} MXN</p>
    <br>
    <p>NOTA: ********************</p>
    `
    const sentMail = await mail(to, subject, html)
    if (sentMail) {
        return code
    }
    return null
}


