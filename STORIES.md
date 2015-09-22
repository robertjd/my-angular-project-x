## Regarding the integration of `express-stormpath` and the Stormpath Angular SDK

#### Stories


1. > I want Stormpath to handle login & registration, inside my Angular appication,
    by serving views at /login and /register (etc).

  This situation has a few sub stories:

  > I want to use HTML5 routing

  In this situation, we must:

    * Serve their Angular application when a request comes in for URLs such as
      `/login`, `/register`, and all other URLSs which have a default HTML response
      from `express-stormpath`

    * For those same URLs, we need to show a view on the client - this is managed
      by Angular, either through ngRoute or UI Router

    * This is when you would use the "spaRoot" to inform us
      where your Angular application file (index.html) exists

  > I want to use hashbang routing


  In this situation they may want to disable the default HTML responses for
  `/login`, etc.  At the moment we cannot disable the HTML responses while leaving
  the JSON API available.

  > I don't want to use Stormpath's default views

  They can use the `sp-template-url` option to tell us what view to use (need
  better documentation about what is avilable to the template, on $scope)


2. > I want to use Stormpath in my Angular application, but I don't use
      traditional URLS like /login

  This is for those who do special login flows, like a pop-up login box,
  or something more esoteric.

  These users simply need to use the `sp-login`, etc, directives to render
  the view when they are ready.  The directive already knows how to communicate
  to the JSON endpoint.

  In this situation they may want to disable the default HTML responses for
  `/login`, etc.  At the moment we cannot disable the HTML responses while leaving
  the JSON API available.

3. > I want Stormpath to handle login & registration, but outside of my Angular application.

    This story can describe developers who have a traditional web application that
    is not using Angular, but they are trying to add an Angular appication to it.
    They want to use Angular, but don't necessarily want to have it handle login
    an registration.

    This story describes developers who want to protect access to an Angular application,
    but they don't want to put login & registration code into the Angular application.

    This situation not require any special configuration.  We serve our default
    HTML-form based views.  The developer uses the `nextUri` options to
    redirect the user to somewhere else after login or registration.  That
    somewhere else is likely their angular application, which we don;t have
    to serve (because they are handling it themselves).


