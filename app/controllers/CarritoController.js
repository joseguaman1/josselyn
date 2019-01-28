'use strict';
var models = require('./../models');
var Vino = models.vino;
var Marca = models.marca;
class CarritoController {
    cargarCarro(req, res) {
        var carrito = req.session.carrito;
        console.log(carrito);
        var external = req.params.external;
        Vino.findOne({where:{external_id:external}, include: {model: Marca}}).then(function (vino) {
            var data = {external: external, nombre: vino.nombre, marca: vino.marca.nombre, cant: 1, pu: vino.precio, pt: vino.precio};
            carrito.push(data);
            req.session.carrito = carrito;
            console.log(req.session.carrito);
            res.status(200).json(req.session.carrito);
        }).catch(function (err) {
            console.log("Error:", err);
            res.status(500).json(err);
        });
    }
}
module.exports = CarritoController;