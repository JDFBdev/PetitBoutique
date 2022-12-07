const express = require('express');
const sequelize = require('../db');
const { Op } = require("sequelize");
const Productos = require('../models/productos');
const router = express.Router();

router.get('/:param', async (req, res) => {
    let {param} = req.params;
    try {
        // Productos.vector = sequelize.fn('to_tsvector', 'nombre')
        // productosNombre = await Productos.findAll({
        //     where: { 
        //         vector: { [Op.match]: sequelize.fn('to_tsquery', param) }
        //       }
        //     // where: sequelize.literal(`SELECT nombre FROM productos WHERE to_tsvector(nombre) @@ to_tsquery('remera')`),
        //   });
        const [productosNombre, meta] = await sequelize.query(`SELECT nombre FROM productos WHERE to_tsvector(nombre) @@ to_tsquery('Enterituki');`);
        console.log(productosNombre);
    }
    catch(err) {
        console.log(err);
        return res.send({message: "Error encontrando producto", err, success: false})
    }
})

module.exports = router;
