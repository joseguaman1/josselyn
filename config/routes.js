var express = require('express');
var app = express.Router();
var passport = require('passport');
var home = require('../app/controllers/home');
var cuenta = require('../app/controllers/CuentaController');
var cuentaController = new cuenta();
//you can include all your controllers


app.get('/josellyn/inicio_sesion', cuentaController.verLogin);
app.get('/josellyn/registro', cuentaController.verRegistro);
app.post('/josellyn/registro/guardar', 
passport.authenticate('local-signup', {successRedirect: '/josellyn/inicio_sesion',
    failureRedirect: '/josellyn/registro', failureFlash: true}
));
app.post('/josellyn/inicio_sesion/iniciar', 
passport.authenticate('local-signin', 
{successRedirect: '/josselyn',
    failureRedirect: '/josellyn/inicio_sesion', 
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


