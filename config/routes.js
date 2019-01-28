var express = require('express');
var app = express.Router();
var passport = require('passport');

var cuenta = require('../app/controllers/CuentaController');
var cuentaController = new cuenta();

var marca = require('../app/controllers/MarcaController');
var marcaController = new marca();

var vino = require('../app/controllers/VinoController');
var vinoController = new vino();

var carro = require('../app/controllers/CarritoController');
var carrito = new carro();
//you can include all your controllers

var auth = function middleWare(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('err_cred', 'Inicia sesion!!!');
        res.redirect('/josselyn/inicio_sesion');
    }
}

app.get('/josselyn/administrador', auth, function (req, res, next) {
    var models = require('../app/models');
        var Vino = models.vino;
        var Marca = models.marca;
        Vino.findAll({include: {model: Marca}}).then(function (vinos) {
            if(req.session.carrito == undefined) {
                req.session.carrito = [];
                console.log("************");
            }
            console.log(req.session.carrito);
            res.render('plantilla_admin',
            {titulo: "Administracion",
                fragmento: 'fragmentos/frm_principal_admin',
                admin: req.user.nombre,
                rol: req.user.rol,
                lista: vinos
            });
            

        }).catch(function (err) {
            console.log("Error:", err);
            req.flash('error', 'Hubo un error');
            res.redirect('/josselyn');
        });
    

});

app.get('/josselyn', function (req, res, next) {

    if (req.isAuthenticated()) {
        res.redirect('/josselyn/administrador');
    } else {
        var models = require('../app/models');
        var Vino = models.vino;
        var Marca = models.marca;
        Vino.findAll({include: {model: Marca}}).then(function (vinos) {

            res.render('plantilla', {titulo: "Principal", lista: vinos});

        }).catch(function (err) {
            console.log("Error:", err);
            req.flash('error', 'Hubo un error');
            res.redirect('/josselyn');
        });
        
    }

});

app.get('/josselyn/inicio_sesion', cuentaController.verLogin);
app.get('/josselyn/registro', cuentaController.verRegistro);
app.post('/josselyn/registro/guardar',
        passport.authenticate('local-signup', {successRedirect: '/josselyn/inicio_sesion',
            failureRedirect: '/josselyn/registro', failureFlash: true}
        ));
app.post('/josselyn/inicio_sesion/iniciar',
        passport.authenticate('local-signin',
                {successRedirect: '/josselyn/administrador',
                    failureRedirect: '/josselyn/inicio_sesion',
                    failureFlash: true}
        ));
//marcas
app.get('/josselyn/administrar/marca', auth, marcaController.verMarca);
app.post('/josselyn/administrar/marca/guardar', auth, marcaController.guardar);
app.post('/josselyn/administrar/marca/modificar', auth, marcaController.modificar);
//vinos
app.get('/josselyn/administrar/vino', vinoController.verVino);
app.get('/josselyn/administrar/vino/registro', auth, vinoController.verRegistro);
app.get('/josselyn/administrar/vino/modificar/:external', auth, vinoController.verEditar);
app.post('/josselyn/administrar/vino/guardar', auth, vinoController.guardar);
app.post('/josselyn/administrar/vino/modificar', auth, vinoController.modificar);
app.get('/josselyn/administrar/vino/foto/:external',  vinoController.verFoto);
app.post('/josselyn/administrar/vino/foto/subir',  vinoController.guardarImagen);


//carrito
app.get('/josselyn/compra/carrito/:external', auth,  carrito.cargarCarro);
//administrar marcas


//    app.get('/login', home.login);
//    app.get('/signup', home.signup);
//
//    app.get('/', home.loggedIn, home.home);//home
//    app.get('/home', home.loggedIn, home.home);//home
//
//    app.post('/signup', passport.authenticate('local-signup', {
//        successRedirect: '/home', // redirect to the secure profile section
//        failureRedirect: '/signup', // redirect back to the signup page if there is an error
//        failureFlash: true // allow flash messages
//    }));
//    // process the login form
//    app.post('/login', passport.authenticate('local-login', {
//        successRedirect: '/home', // redirect to the secure profile section
//        failureRedirect: '/login', // redirect back to the signup page if there is an error
//        failureFlash: true // allow flash messages
//    }));
module.exports = app;


