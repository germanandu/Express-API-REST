const express = require('express')
const sequelize = require('./database/db')
const monedasRoute = require ('./routes/monedasRoute')
const userRoutes = require ('./routes/userRoutes')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/api/moneda',monedasRoute)
app.use('/api/user',userRoutes)

app.listen(port, () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`)

  // Force true: DROP TABLES
  sequelize.sync({ force: false }).then(() => {
    console.log("Nos hemos conectado a la base de datos");
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })
})