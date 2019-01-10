var express = require('express');
require('dotenv').config();
var app = express();
var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');
var passport   = require('passport');

var port = process.env.PORT || 8042;
var flash = require('connect-flash');
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs'); // set up ejs for templating


//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret

app.use(session({
    secret: 'I Love Software...',
    resave: true,
    saveUninitialized: true
}));
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(passport.initialize()); 
app.use(passport.session()); // persistent login sessions
// routes ======================================================================
//require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport\
var router = require('./config/routes.js');
app.use('/', router);
//modelos
var models = require('./app/models/');
models.sequelize.sync().then( () => {
    console.log('Se ha conectado la bd');
}).catch(err => {console.log(err, "Hubo un error");}) ;

require('./config/pasaporte/passport.js')(passport, models.cuenta, models.persona, models.rol);

//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});
module.exports = app;
