const Sequelize = require('sequelize');

const sequelize = require('../database');

const Venta = sequelize.define('venta', {
  id_venta: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  folio: Sequelize.STRING,
});

module.exports = Venta;