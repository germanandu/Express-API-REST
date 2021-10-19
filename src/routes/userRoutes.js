const express = require ('express')
const User = require ('../database/models/User')
const Moneda = require ('../database/models/Moneda')
const jwt = require('jsonwebtoken');
const verifyToken = require('../auth/authJwt')

const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json({users});
    } catch (err) {
      console.error(err);
      res.send('Server error');
    }
  });
  
  router.get('/:user_id', async (req, res) => {
    try {
      const users = await User.findAll({
        where: {
          user_id: req.params.user_id
        }
      });
      res.json(users);
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  });

  router.put('/',verifyToken, async (req, res) => {
    try {
      const user = await User.update(
        {
        moneda_id: req.body.moneda_id
        },
        {
        where: {
          username: req.body.username
        }
      });
      res.json({message: "!Updated"});
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  });

  router.get('/login', async (req, res) => {
    try {
      const {username,password} = req.body
      const user = await User.findAll({
        where: {
          username: username
        }
      });

      if (!user) return res.status(400).json({message: "User not found"})

      const token  = jwt.sign({id: user.user_id}, 'secret', { expiresIn: '86400' }); //24 horas

      res.status(200).json({token})
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  });
  
  router.post('/', async (req, res) => {
      try {
          const users = await User.findAll();
          const currentId =  users.length + 1;
          const newUser = await User.create({
            user_id: currentId,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            username: req.body.username,
            password: req.body.password,
            moneda_id: req.body.moneda_id
        });
        // TOKEN JWT
        const token  = jwt.sign({id: newUser.user_id}, 'secret', { expiresIn: '86400s' }); //24 horas
        res.status(200).json({token})
      } catch (err) {
        console.error(err);
        res.send(err);
      }
    });
  
  module.exports = router;