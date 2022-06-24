const express = require('express');
const { Op } = require("sequelize");
const Productos = require('../models/productos');
const router = express.Router();

router.get('/:param', async (req, res) => {
    const {param} = req.params
    const categorias = ["Pantalones", "Remeras", "Bebes", "Vestidos", "Accesorios", "Abrigos", "Nenes", "Nenas", "Unisex"];
    const esCategoria = categorias.find(categoria => {
        return param.toLowerCase() === categoria.toLowerCase();
      });
    try {
        if (esCategoria) {
            var productosCategoria = await Productos.findAll({
                where: {
                    "categoria": {
                        [Op.contains]: [param.toLowerCase()]
                    }
                }
            });
        } else {
            var productosNombre = await Productos.findAll({
                where: {
                    "nombre": {
                        [Op.iLike]: `%${param}%`
                    }
                }
            });
        }
    }
    catch(err) {
        return res.send({message: "Error encontrando producto", err, success: false})
    }
    if (esCategoria) {
        return res.send(productosCategoria);
    }else if (productosNombre[0]) {
        let promesas = [];
        productosNombre[0].categoria.forEach(categoria => {
            promesas.push( Productos.findAll({
                where: {
                    "categoria": {
                        [Op.contains]: [categoria]
                    }
                }
            }))
        });
        await Promise.all(promesas).then(values => {
            values.forEach(value => {
                productosNombre = productosNombre.concat(value);
            })
        })
        // filtro
        productosNombre = productosNombre.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
        )
        return res.send(productosNombre);
    }
    res.send({message: "No se encontraron productos", success: true});
})

module.exports = router;