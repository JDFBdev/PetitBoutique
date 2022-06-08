const express = require('express');
const router = express.Router();
const Productos = require('../models/productos')

router.post('/', async (req, res) => {
    let {nombre, color} = req.body;
    try {
        await Productos.destroy({where: {id}})
    }
    catch(err){
        return res.send({message:"Problema borrando producto en db", err, success: false});
    }
    res.send({message:`Producto borrado correctamente`, success: true});
})

module.exports = router;