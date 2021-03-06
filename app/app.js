'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.frequencies',
  'myApp.fibonacci',
  'myApp.numberInput'
])

myApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
