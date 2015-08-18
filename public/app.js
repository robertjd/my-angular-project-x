'use strict';

angular.module('spExampleApp', [
  'ngRoute',
  'stormpath'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/secret', {
      templateUrl: 'secret.html',
      controller: 'SecretCtrl'
    })
    .when('/', {
      templateUrl: 'main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}])
.service('helpers',['$window','$timeout',function($window,$timeout){
  /*
    A quick helper function, which shamelessly grabs jquery
    from the window and applies an animation fade-in.  There
    are better solutions, if you want to go the Angular Way (tm)
   */
  return {
    fadeIn: function fadeIn(){
      $timeout(function(){
        $window.$('.view').addClass('animated fadeIn');
      },100);
    }
  };
}])
.controller('MainCtrl',['$user','helpers',function($user,helpers){
  /*
    For the main page, we want to show it as soon as we know the user
    state, we don't care if the user is logged in or not.  We can used
    the finally clause on the promise to achieve this.
  */
  $user.get().finally(helpers.fadeIn);
}])
.controller('SecretCtrl',['helpers','$user','$window',function(helpers,$user,$window){
  /*
    For our protected page, we only want to show the page if the user
    is logged in. We achive this by using the then() clause.  If the user
    is not logged in, we catch that and redirect them to the login page
  */
  $user.get().then(helpers.fadeIn).catch(function(){
    $window.location.replace('/login?nextUri='+encodeURIComponent('#/secret'));
  });
}]);