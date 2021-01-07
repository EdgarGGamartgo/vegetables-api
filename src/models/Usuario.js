import Sequelize from 'sequelize'
import { sequelize } from '../util/database'

export const Usuario = sequelize.define('usuario', {
  id_usuario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nombre: Sequelize.STRING,
  apellido_paterno: Sequelize.STRING,
  apellido_materno: Sequelize.STRING,
  telefono: Sequelize.INTEGER,
  email: Sequelize.STRING,
  calle: Sequelize.STRING,
  colonia: Sequelize.STRING,
  ciudad: Sequelize.STRING,
  estado: Sequelize.STRING,
  codigo_postal: Sequelize.STRING,
  folio: Sequelize.STRING,
  rol: Sequelize.STRING,
});
