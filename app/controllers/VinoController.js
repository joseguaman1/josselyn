'use strict';
var models = require('./../models');
var Vino = models.vino;
var Marca = models.marca;
const uuidv4 = require('uuid/v4');
//para subir archivos
var fs = require('fs');
var maxFileSize = 1 * 1024 * 1024;
var extensiones = ["jpg", "png"];
var formidable = require('formidable');
//app.use(formidable({keepExtensions: true}));
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
            if (updatedVino) {
                req.flash('info', 'Se ha creado correctamente', false);
                res.redirect('/josselyn/administrar/vino');
            }
        });
    }

    verFoto(req, res) {
        res.render('plantilla_admin',
                {titulo: "Administracion de Vinos",
                    fragmento: 'fragmentos/vinos/frm_foto',
                    rol: req.user.rol,                    
                    external: req.params.external,
                    info: (req.flash('info') != '') ? req.flash('info') : '',
                    error: (req.flash('error') != '') ? req.flash('error') : ''
                });
    }

    guardarImagen(req, res) {        
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {        
            console.log(files.archivo);
            if (files.archivo.size <= maxFileSize) {
                var extension = files.archivo.name.split(".").pop().toLowerCase();
                if (extensiones.includes(extension)) {
                    var nombre = fields.external + "." + extension;
                    fs.rename(files.archivo.path, "public/img/" + nombre, function (err) {
                        if (err)
                            next(err);
                        Vino.update({
                            foto: nombre,
                        }, {where: {external_id: fields.external}}).then(function (updatedVino, created) {
                            if (updatedVino) {
                                req.flash('info', 'Se ha subido correctamente', false);
                                res.redirect('/josselyn/administrar/vino');
                            }
                        });
                    });
                } else {
                    VinoController.eliminar(files.archivo.path);
                    req.flash('error', 'Error de extension', false);
                    res.redirect('/josselyn/administrar/vino/foto/' + fields.external);
                    console.log("error de extension");
                }
            } else {
                VinoController.eliminar(files.archivo.path);
                req.flash('error', 'Error de tamanio se admite ' + maxFileSize, false);
                res.redirect('/josselyn/administrar/vino/foto/' + fields.external);
                console.log("error de tamanio solo se adminte " + maxFileSize);

            }
        });
    }

    static eliminar(link) {
        fs.exists(link, function (exists) {
            if (exists) {                
                console.log('File exists. Deleting now ...');
                fs.unlinkSync(link);
            } else {                
                console.log('No se borro ' + link);
            }
        });
    }

}
module.exports = VinoController;