import Sequelize from 'sequelize'
import { sequelize } from '../util/database'

export const Venta = sequelize.define('venta', {
  id_venta: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  folio: Sequelize.STRING,
  codigo_compra: Sequelize.STRING,
  nombre_producto: Sequelize.STRING,
  cantidad: Sequelize.INTEGER,
  unidad: Sequelize.STRING,
  costo_unidad: Sequelize.DOUBLE,
  importe_producto: Sequelize.DOUBLE,
  importe_total: Sequelize.DOUBLE,
  estatus: Sequelize.STRING, // VALIDADA, RECHAZADA, PENDIENTE
  isVisible: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});
