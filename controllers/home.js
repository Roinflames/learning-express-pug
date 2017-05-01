var express = require('express');
var mongoose = require('mongoose');

class HomeController {

  //get
  Render(req, res) {
    isAuthenticated()
      .then( users => {
        return res.status(200).render('home-mat', { user: req.user});
      })
      .catch( err => {
        return res.status(500).json({
          success: false,
          message: 'Lo sentimos, Hubo un problema en responder tu solicitud.',
        });
      })
  }
/*
  router.get('/home', isAuthenticated, function(req, res){
    res.render('home-mat', { user: req.user});
  });*/

}

module.exports = HomeController;
