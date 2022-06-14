const { DataTypes } = require('sequelize');
const db = require('../db');

const Productos = db.define('productos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  talle: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imagen: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  categoria: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
})

Productos.sync({ force: false });

module.exports = Productos;