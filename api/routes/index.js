var express = require('express');
var router = express.Router();

const crearProducto = require('./crearProducto');
router.use('/crearProducto', crearProducto);

const borrarProducto = require('./borrarProducto');
router.use('/borrarProducto', borrarProducto);

const editarProducto = require('./editarProducto');
router.use('/editarProducto', editarProducto);

const todosProductos = require('./todosProductos');
router.use('/todosProductos', todosProductos);

const buscarProducto = require('./buscarProducto');
router.use('/buscarProducto', buscarProducto);

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send(`hello world`);
});

module.exports = router;