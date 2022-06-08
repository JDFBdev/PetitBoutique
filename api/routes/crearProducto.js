const express = require('express');
const router = express.Router();
const Productos = require('../models/productos')

router.post('/', async (req, res) => {
    let {nombre, precio, color, talle, descripcion, imagen, categoria} = req.body;
    try {
        await Productos.create({
            nombre,
            precio,
            color,
            talle,
            descripcion,
            imagen,
            categoria
        })
    }
    catch(err){
        return res.send({message:"Problema guardando producto en db", err, success: false});
    }
    res.send({message:`Producto registrado correctamente`, success: true});
})

module.exports = router;