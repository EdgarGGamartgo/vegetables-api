const Sequelize = require('sequelize');

const sequelize = require('../database');

const Producto = sequelize.define('producto', {
  id_producto: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  clave_producto: Sequelize.STRING,
  nombre_producto: Sequelize.STRING,
  unidad: Sequelize.STRING,
  contenido: Sequelize.STRING,
  id_grupo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nombre_grupo: Sequelize.STRING,
  existencia: Sequelize.DOUBLE,
  existencia_minima: Sequelize.DOUBLE,
  existencia_maxima: Sequelize.DOUBLE,
  costo: Sequelize.DOUBLE,
  venta_menudeo: Sequelize.DOUBLE,
  venta_mayoreo: Sequelize.DOUBLE,
  importe_menudeo: Sequelize.DOUBLE,
  importe_mayoreo: Sequelize.DOUBLE,
  id_proveedor: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nombre_proveedor: Sequelize.STRING,
  control: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  imagen: Sequelize.STRING,
});

module.exports = Producto;