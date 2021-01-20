import { Usuario } from '../models/Usuario'
import { Venta } from '../models/Venta'

export const GetSalesByUserService = async() => {
    return await Usuario.findAll({
        include: Venta
    }) 
}