'use strict';

var express = require('express');

var stormpath = require('express-stormpath');

var path = require('path');

var app = express();

var PORT = process.env.port || 3000;

console.log('Initializing Stormpath');

app.use(stormpath.init(app,{
  website: true,
  web:{
    spaRoot: path.join(__dirname, 'public','index.html')
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

// All undefined asset or api routes should return a 404
app.route('/:url(api|auth|components|app|bower_components|assets|images)/*')
  .get(function(req,res){
    res.status(404).end();
  });

// All other routes should redirect to the index.html
app.route('/*')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, 'public','index.html'));
  });

app.on('stormpath.ready',function() {
  console.log('Express bound to ' + PORT);
  app.listen(PORT);
});