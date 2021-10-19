const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}
User.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    password:{
        type: DataTypes.STRING,
        validate:{
            min:8
        } } ,
    moneda_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
}, {
    sequelize,
    modelName: "user"
});

User.associate = (models) => {
    User.belongsTo(models.Moneda, {
      foreignKey: 'moneda_id'
    });
  };

module.exports = User;