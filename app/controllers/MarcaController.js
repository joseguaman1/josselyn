'use strict';
var models = require('./../models');
var Marca = models.marca;
const uuidv4 = require('uuid/v4');
class MarcaController {
    verMarca(req, res) {
        console.log("********");
        Marca.findAll({}).then(function (marcas) {
            console.log(marcas + "Ok...");
            res.render('plantilla_admin',
                    {titulo: "Administracion de Marcas",
                        fragmento: 'fragmentos/marca/frm_marca',
                        rol: req.user.rol,
                        lista: marcas,
                        info: (req.flash('info') != '') ? req.flash('info') : '',
                        error: (req.flash('error') != '') ? req.flash('error') : ''
                    });

        }).catch(function (err) {
            console.log("Error:", err);
            req.flash('error', 'Hubo un error');
            res.redirect('/josselyn');
        });
        
    }
    
    guardar(req, res) {
        Marca.create({
            external_id: uuidv4(),
            nombre: req.body.nombre
        }).then(function (newMarca, created) {
            if(newMarca) {
                req.flash('info', 'Se ha creado correctamente');
                res.redirect('/josselyn/administrar/marca');
            }
        });
    }
    
    modificar(req, res) {
        Marca.update({            
            nombre: req.body.nombre
        }, {where: {external_id: req.body.external}}).then(function (updatedMarca, created) {
            if(updatedMarca) {
                req.flash('info', 'Se ha creado correctamente', false);
                res.redirect('/josselyn/administrar/marca');
            }
        });
    }
    
}
module.exports = MarcaController;
