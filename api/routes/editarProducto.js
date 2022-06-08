const express = require('express');
const router = express.Router();
const Productos = require('../models/productos')

router.post('/', async (req, res) => {
    let {id, nombre, precio, color, talle, descripcion, imagen, categoria} = req.body;
    try {
        await Productos.update({
            nombre,
            precio,
            color,
            talle,
            descripcion,
            imagen,
            categoria
        },
        {where: {id}})
    }
    catch(err){
        return res.send({message: `Error editando producto`, err, success: false});
    }
    res.send({message: `Producto editado correctamente`, success: true});
})

module.exports = router;