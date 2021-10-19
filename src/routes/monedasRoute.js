const express = require ('express')
const Moneda = require ('../database/models/Moneda')
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const monedas = await Moneda.findAll();
    res.json(monedas);
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.get('/:moneda_id', async (req, res) => {
  try {
    const monedas = await Moneda.findAll({
      where: {
        moneda_id: req.params.moneda_id
      }
    });
    res.json(monedas);
  } catch (err) {
    console.error(err);
    res.send('Server error');
  }
});

router.post('/', async (req, res) => {
    try {
        const monedas = await Moneda.findAll();
        const currentId =  monedas.length + 1;
        console.log(req.body.name)
        const newMoneda = await Moneda.create({
        moneda_id: currentId,
        nombre: req.body.nombre,
        precio: req.body.precio,
        fuente: req.body.fuente
      });
      res.json(newMoneda);
      //jwt.sign({newMoneda}, 'secret', { expiresIn: '30s' });
    } catch (err) {
      console.error(err);
      res.send('Server error');
    }
  });

module.exports = router;