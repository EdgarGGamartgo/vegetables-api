import express from 'express'
import { Producto } from './../models/Producto'
import { Venta } from './../models/Venta'
import { Usuario } from './../models/Usuario'
import { sequelize } from '../util/database'

const router = express.Router()

router.post('/sale/create', async (req, res) => {
    try {
      const { products, userData } = req.body
      const sales = await sequelize.transaction(async (t) => {
        return await Promise.all(
          products.map(async(e) => {
            const foundRecord = await Producto.findByPk(e.id_producto)
            if (e.order <= foundRecord.existencia) {
              await foundRecord.update({
                existencia: foundRecord.existencia - e.order
              }, {
                where: {
                  id_producto: e.id_producto
                },
                returning: true,
                transaction: t
              });
              return await Venta.create({
                folio: e.folio,
                nombre_producto: e.nombre_producto,
                unidad: e.unidad,
                costo_unidad: e.costo_unidad,
                importe_producto: e.importe_producto,
                importe_total: e.importe_total
              }, {
                transaction: t
              }); 
            } else {
                //throw new Error(`Lo sentimos, ya no tenemos disponible ${e.order} ${e.unidad} de ${e.nombre_producto}.`)
                console.log(`Lo sentimos, ya no tenemos disponible ${e.order} ${e.unidad} de ${e.nombre_producto}.`)
                res.status(400).send({ status: 400, error: {
                  msg: `Lo sentimos, ya no tenemos disponible ${e.order} ${e.unidad} de ${e.nombre_producto}.`,
                  order: e.order,
                  unidad: e.unidad,
                  nombre_producto: e.nombre_producto
                }})
            }
          })
        )
      });
      const user = await Usuario.create({
        nombre: userData.name,
        apellido_paterno: userData.lastName,
        apellido_materno: userData.secondLastName,
        telefono: userData.phone,
        email: userData.email,
        calle: userData.street,
        colonia: userData.town,
        ciudad: userData.city,
        estado: userData.state,
        codigo_postal: userData.zip,
        folio: products[0].folio,
        rol: "CLIENTE"
      })
      res.send({ status: 201, sales, user })
    } catch (error) {
      console.log("Error when saving sales: ")
    }
  })

export { router as saleRouter }
