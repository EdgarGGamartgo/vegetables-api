import niceInvoice from './../../own_modules/nice-invoice'
import fs from 'fs'

export const invoicePdf = async(products, userData) => {
    console.log('DATA de PDF: ', products, userData)
    const items = products.map(product => {
      return {
            item: product.nombre_producto,
            description: '',
            quantity: product.order,
            price: product.costo_unidad, 
            total: product.importe_producto,
            tax: ''
      }
    })

    const invoiceDetail = {
        shipping: {
          name: `${userData.name} ${userData.lastName} ${userData.secondLastName}`,
          address: `${userData.street}, ${userData.town}`,
          city: userData.city,
          state: userData.state,
          country: "Mexico",
          postal_code: userData.zip
        },
        items,
        subtotal: products[0].importe_total,
        total: products[0].importe_total,
        order_number: products[0].folio,
        header:{
            company_name: "SAN MARTIN",
            company_logo: "logo.png",
            company_address: "Calle 48 no 258 entre moctezuma y valle"
        },
        footer:{
          text: ""
        },
        currency_symbol:"$", 
        date: {
          billing_date: new Date().toLocaleDateString(),
          due_date: new Date().toLocaleDateString(),
        }
    };
    
    const gettingPdf = await new Promise((resolve, reject) => {
      niceInvoice(invoiceDetail, './assets/pedido_aceptado.pdf');
       setTimeout(() => {
         resolve(true)
       }, 1500)
    })

    try {
      const invoiceFile = fs.readFileSync('./assets/pedido_aceptado.pdf', 'utf8')
      console.log('gettingPdf: ', gettingPdf, invoiceFile)
      return true
    } catch (e) {
      console.log('ERROR GETTINNG FILE: ', e)
      return false
    }

}

