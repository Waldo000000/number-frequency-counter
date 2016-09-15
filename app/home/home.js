'use strict';

var home = angular.module('myApp.home', ['ngRoute'])

home.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/home/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl'
  });
}]);

home.controller('HomeCtrl', ['$scope', '$location', function ($scope, $location) {
  this.go = function (path) {
    if (this.form.$invalid) {
      this.form.$setDirty();
      return;
    }
    $location.path(path);
  };
}]);