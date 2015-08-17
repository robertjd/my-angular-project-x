'use strict';



// if i bind two route handlers to the same path, what happens?


var app = require('express')();

app.get('/login',function(req,res) {
  res.send('login path 1');
});

app.get('/login',function(req,res) {
  res.send('login path 2');
});

app.listen(3003);



/*
  A few possible situations (for angular or react, any SPA framework that
  serves a index.html as the thing that bootstraps the JS application in the browser):

  1. I want Stormpath to use the built-in jade pages for login & registration.
      After the user is done with those pages they are redirected to the nextUri
      which is handled by my angular application.  I will be configuring
      my express app myself in a way that makes sense to me.

      ^ this does not require any special configuration, they will figure out their
      own way of serving their angular assets.  I think most people who already have
      an application will want to use this option

  2. I want to use the /login and /register routes in my angular application.  I want it
      to show view content from my angular application, I do not want it
      to show the default jade page that stormpath provides.

      ^ this requires us to:
          * NOT serve our default HTML page at /login or /register,
            but serve their index.html instead
          * This is where a "spaRoot" setting could come in, which is a
            folder that we just serve with express.static()

  3. I do not want to use a login page, my application will have a pop-up
      login dialog or registration dialog that is accessible from everywhere
      you are on the site.

      ^ this requires us to NOT serve any HTML page at /login or /register,
        this is kind of annoying and I don't know what those options should
        look like

 */