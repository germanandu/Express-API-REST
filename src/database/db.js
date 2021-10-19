const { Sequelize } = require('sequelize')
const { database } = require('./config') 

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql",
        define: {
            timestamps: false,
            createdAt: false
          },
    },
)

module.exports = sequelize