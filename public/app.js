'use strict';

angular.module('spExampleApp', [
  'ngRoute',
  'stormpath'
])
.config(['$routeProvider', function($routeProvider) {
  console.log('config');
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
.run(['$user','$window','$rootScope',function($user,$window,$rootScope){
  function fadeIn(){
    setTimeout(function(){
      var el = $window.$('.view');
      console.log('fade in',el.length);
      el.addClass('animated fadeIn');
      // el.css('opacity','100');
      $rootScope.$digest();
    },100);
  }
  $rootScope.$on('$currentUser',fadeIn);
  $user.get().finally(fadeIn);
}])
.controller('MainCtrl',['$scope','$user','$window',function($scope,$user,$window){
  console.log('MainCtrl');
  $user.get().finally(function(){
    setTimeout(function(){
      console.log('the other fade in');
      var el = $window.$('.view');
      el.addClass('animated fadeIn');
    },100);
  });
}])
.controller('SecretCtrl',['$scope','$user','$window',function($scope,$user,$window){
  $user.get().then(function(){
    setTimeout(function(){
      console.log('the other fade in');
      var el = $window.$('.view');
      el.addClass('animated fadeIn');
    },100);
  }).catch(function(){
    $window.location.replace('/login?nextUri='+encodeURIComponent('#/secret'));
  });
}]);