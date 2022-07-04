const express = require('express');
const { Op } = require("sequelize");
const Productos = require('../models/productos');
const router = express.Router();

router.get('/:param', async (req, res) => {
    const {param} = req.params;
    const inputs = param.split(" ");
    inputs.forEach(input => {
        const index = inputs.indexOf(input);
        if (input.length <= 3) {
            inputs.splice(index, 1);
        }
    });
    var productosNombre = [];
    const categorias = ["Pantalones", "Remeras", "Bebes", "Vestidos", "Accesorios", "Abrigos", "Nenes", "Nenas", "Unisex"];
    if (inputs.length == 1) {
        var esCategoria = categorias.find(categoria => {
            return inputs[0].toLowerCase() === categoria.toLowerCase();
        });
    }
    try {
        if (esCategoria) {
            var productosCategoria = await Productos.findAll({
                where: {
                    "categoria": {
                        [Op.contains]: [inputs[0].toLowerCase()]
                    }
                }
            });
        } else {
            let promesas = [];
            inputs.forEach(input => {
                promesas.push( Productos.findAll({
                    where: {
                        "nombre": {
                            [Op.iLike]: `%${input}%`
                        }
                    }
                }))
            });
            await Promise.all(promesas).then(values => {
                values.sort(function (a, b) {
                    return a.length - b.length;
                });
                values.forEach(value => {
                    productosNombre = productosNombre.concat(value);
                })
            })
        }
    }
    catch(err) {
        console.log(err);
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