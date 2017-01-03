var express = require('express');
var router = express.Router();

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var port = new SerialPort('/dev/ttyUSB0');
var dato;


var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){
	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		port.on('data', function (data) {
		//console.log('Data: ' + data);
		dato = JSON.parse(data);
		//console.log(dato);
		});
		res.render('home-mat', { user: req.user, lectura: dato});
		console.log(dato);
	});

	router.post('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		console.log('index view');
	});

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index-material', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

/* GET estado*/
	router.get('/estado', function(req, res) {
  	res.render('estado', { Lunes: arduino.dia.medicion.Lunes, Martes: arduino.dia.medicion.Martes, Miercoles:arduino.dia.medicion.Miercoles, Jueves: arduino.dia.medicion.Jueves, Viernes: arduino.dia.medicion.Viernes, Sabado: arduino.dia.medicion.Sabado, Domingo: arduino.dia.medicion.Domingo});
	});

	router.get('/historico', function(req, res) {
  	res.render('historico');
	});

	router.get('/perfil', isAuthenticated, function(req, res){
		res.render('perfil', { user: req.user });
	});

	router.get('/arduino', function(req, res){
		res.render('arduino', { title: 'Hey', message: 'you'});
		console.log("arduino");
	});

	return router;
}
