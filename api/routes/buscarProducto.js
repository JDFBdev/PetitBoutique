const express = require('express');
const Productos = require('../models/productos');
const router = express.Router();

// Get all tricks in the Tricks database
router.get('/:id', async (req, res) => {
    let {id} = req.params
    try {
        var producto = await Productos.findOne({where: {id}});
    }
    catch(err) {
        return res.send({message: "Error encontrando producto", err, success: false})
    }
    res.send(producto);
})

module.exports = router;