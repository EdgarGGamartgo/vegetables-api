import { Usuario } from '../models/Usuario'
import { Venta } from '../models/Venta'
import { Op } from 'sequelize'

// User-Venta One to Many
// Venta-User Many to One
export const GetSalesByUserService = async() => {
    // const userSales = await Usuario.findAll({
    //     include: Venta
    // }) 
    // {
    //     where: {
    //         updatedAt: 
    //     }
    // },
    return await Venta.findAll({
        where: {
            updatedAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
            }
        },
        include: Usuario
    }) 
}