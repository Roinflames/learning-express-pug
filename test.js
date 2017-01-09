var express = require('express');
var app = express();
var router = express.Router();
//var path = require('path');
//var favicon = require('static-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

//app.use(logger('dev'));
////app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
  res.send("texto");
});
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3001, function () {
  console.log('Escuchando en puerto 3000!')
})

module.exports = app;
