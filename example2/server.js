'use strict';

var express = require('express');

var stormpath = require('express-stormpath');

var path = require('path');

var app = express();

app.use(stormpath.init(app,{
  application: {
    href: 'https://api.stormpath.com/v1/applications/1h72PFWoGxHKhysKjYIkir',
  },
  web:{
    login:{
      enabled: true
    },
    logout:{
      enabled: true
    },
    register:{
      enabled: true
    },
    me:{
      enabled: true
    },
    spaRoot: path.join(__dirname, 'public','index.html')
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

// All undefined asset or api routes should return a 404
app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  .get(function(req,res){
    res.status(404).end();
  });

// All other routes should redirect to the index.html
app.route('/*')
  .get(function(req, res) {
    console.log('2');
    res.sendFile(path.join(__dirname, 'public','index.html'));
  });

app.on('stormpath.ready',function() {
  app.listen(3000);
});