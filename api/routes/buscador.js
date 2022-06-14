const express = require('express');
const { Op } = require("sequelize");
const Productos = require('../models/productos');
const router = express.Router();

router.get('/:param', async (req, res) => {
    let {param} = req.params
    try {
        var productosCategoria = await Productos.findAll({
            where: {
                "categoria": {
                    [Op.contains]: [param]
                }
            }
        });
        var productosNombre = await Productos.findAll({
            where: {
                "nombre": {
                    [Op.iLike]: `%${param}%`
                }
            }
        });
    }
    catch(err) {
        return res.send({message: "Error encontrando producto", err, success: false})
    }
    if (productosCategoria[0]) {
        return res.send(productosCategoria);
    }
    if (productosNombre[0]) {
        return res.send(productosNombre);
    }
    res.send({message: "No se encontraron productos", success: true});
})

module.exports = router;