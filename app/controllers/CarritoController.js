'use strict';
var models = require('./../models');
var Vino = models.vino;
var Marca = models.marca;
class CarritoController {
    cargarCarro(req, res) {
        var carrito = req.session.carrito;
        console.log(carrito);
        var external = req.params.external;
        Vino.findOne({where: {external_id: external}, include: {model: Marca}}).then(function (vino) {
            var pos = CarritoController.verificar(carrito, external);
            if (pos == -1) {
                var data = {external: external, nombre: vino.nombre, marca: vino.marca.nombre, cant: 1, pu: vino.precio, pt: vino.precio};
                carrito.push(data);
                req.session.carrito = carrito;
                console.log(req.session.carrito);
            } else {
                var data = carrito[pos];
                data.cant = data.cant + 1;
                data.pt = data.cant * data.pu;
                carrito[pos] = data;
            }
            res.status(200).json(req.session.carrito);
        }).catch(function (err) {
            console.log("Error:", err);
            res.status(500).json(err);
        });
    }
    static verificar(lista, external) {
        var pos = -1;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].external == external) {
                pos = i;
                break;
            }
        }
        return pos;
    }
}
module.exports = CarritoController;