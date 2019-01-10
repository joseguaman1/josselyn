var express = require('express');
var app = express.Router();
var passport = require('passport');

var cuenta = require('../app/controllers/CuentaController');
var cuentaController = new cuenta();
//you can include all your controllers

app.get('/josselyn/administrador', function (req, res, next) {
    
    if(req.isAuthenticated()) {
        res.render('plantilla_admin', 
        {titulo: "Administracion", 
            fragmento: 'fragmentos/frm_principal_admin', 
            admin: req.user.nombre,
            rol: req.user.rol
        });
    } else {
        req.flash('err_cred', 'Inicia sesion!!!');
        res.redirect('/josselyn/inicio_sesion');
    }
    
});

app.get('/josselyn', function (req, res, next) {
    
    if(req.isAuthenticated()) {
        res.render('plantilla_admin', 
        {titulo: "Administracion", 
            fragmento: 'fragmentos/frm_pricipal_admin', 
            admin: req.user.nombre,
            rol: req.user.rol
        });
    } else {
        res.render('plantilla', {titulo: "Principal"});
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


