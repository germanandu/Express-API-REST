const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Moneda extends Model {}
Moneda.init({
    moneda_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    fuente: DataTypes.STRING,
    
}, {
    sequelize,
    modelName: "moneda"
});

Moneda.associate = (models) => {
  Moneda.hasOne(models.User, {
    foreignKey: 'moneda_id'
  });
};
module.exports = Moneda;