'use strict';
var models = require('./../models');
var Vino = models.vino;
var Marca = models.marca;
const uuidv4 = require('uuid/v4');
class VinoController {
    verVino(req, res) {

        Vino.findAll({include: {model: Marca}}).then(function (vinos) {

            res.render('plantilla_admin',
                    {titulo: "Administracion de Vinos",
                        fragmento: 'fragmentos/vinos/frm_vinos',
                        rol: req.user.rol,
                        lista: vinos,
                        info: (req.flash('info') != '') ? req.flash('info') : '',
                        error: (req.flash('error') != '') ? req.flash('error') : ''
                    });

        }).catch(function (err) {
            console.log("Error:", err);
            req.flash('error', 'Hubo un error');
            res.redirect('/josselyn');
        });

    }

    verRegistro(req, res) {

        Marca.findAll({where: {estado: true}}).then(function (marcas) {

            res.render('plantilla_admin',
                    {titulo: "Administracion de Vinos",
                        fragmento: 'fragmentos/vinos/frm_registro',
                        rol: req.user.rol,
                        marcas: marcas,
                        info: (req.flash('info') != '') ? req.flash('info') : '',
                        error: (req.flash('error') != '') ? req.flash('error') : ''
                    });

        }).catch(function (err) {
            console.log("Error:", err);
            req.flash('error', 'Hubo un error');
            res.redirect('/josselyn/administrar/vino');
        });

    }

    guardar(req, res) {
        Vino.create({
            external_id: uuidv4(),
            nombre: req.body.nombre,
            fecha_creacion: req.body.fecha,
            tipo: req.body.tipo,
            cantidad: req.body.cant,
            precio: req.body.precio,
            pais: req.body.pais,
            id_marca: req.body.marca,
            foto: 'sin_botella.png'
        }).then(function (newVino, created) {
            if (newVino) {
                req.flash('info', 'Se ha creado correctamente');
                res.redirect('/josselyn/administrar/vino');
            }
        });
    }

    verEditar(req, res) {
        Vino.findOne({where: {external_id: req.params.external}}).then(function (vino) {
            if (vino) {
                Marca.findAll({where: {estado: true}}).then(function (marcas) {
                    res.render('plantilla_admin',
                            {titulo: "Administracion de Vinos",
                                fragmento: 'fragmentos/vinos/frm_edicion',
                                rol: req.user.rol,
                                marcas: marcas,
                                vino: vino,
                                info: (req.flash('info') != '') ? req.flash('info') : '',
                                error: (req.flash('error') != '') ? req.flash('error') : ''
                            });

                }).catch(function (err) {
                    console.log("Error:", err);
                    req.flash('error', 'Hubo un error');
                    res.redirect('/josselyn/administrar/vino');
                });
            } else {

            }
        });

    }
    
    modificar(req, res) {
        Vino.update({            
            nombre: req.body.nombre,
            fecha_creacion: req.body.fecha,
            tipo: req.body.tipo,
            cantidad: req.body.cant,
            precio: req.body.precio,
            pais: req.body.pais,
            id_marca: req.body.marca,
        }, {where: {external_id: req.body.external}}).then(function (updatedVino, created) {
            if(updatedVino) {
                req.flash('info', 'Se ha creado correctamente', false);
                res.redirect('/josselyn/administrar/vino');
            }
        });
    }

}
module.exports = VinoController;