/*==============================================================================
                              Configuración paquetes
  Express:
  path:
  favicon:
  logger:
  cookieParser:
  bodyParser:
==============================================================================*/
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*==============================================================================
                              Configuración BDD
==============================================================================*/
var dbConfig = require('./db');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
/*==============================================================================
                              Configuración vistas
app.set:
path.join
==============================================================================*/
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/*==============================================================================
                              Configuración
app.use:
logger:
bodyParser:
cookieParser:
express.static:
path.join:
==============================================================================*/
//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*==============================================================================
                              Lectura de datos
fs: filesystem
==============================================================================*/
fs = require('fs')
fs.readFile(__dirname+'/public/json/data.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  arduino = JSON.parse(data);
  //, function(k, v) {
    //return props.hasOwnProperty(k) ? parseInt(v, 10) : v;
  //}
});
/*==============================================================================
                              Passport
==============================================================================*/
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);
/*==============================================================================
 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates

 CONTINUAR AQUI
 ==============================================================================*/
var flash = require('connect-flash');
app.use(flash());

var routes = require('./routes/index')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.listen(3000, function () {
  console.log('Escuchando en puerto 3000!')
})

module.exports = app;
