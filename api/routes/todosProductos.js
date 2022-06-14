const express = require('express');
const Productos = require('../models/productos');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        var productos = await Productos.findAll();
    }
    catch(err) {
        return res.send({message: "Error devolviendo productos", err, success: false})
    }
    res.send(productos);
})

module.exports = router;