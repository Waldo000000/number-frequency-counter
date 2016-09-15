'use strict';

var view0 = angular.module('myApp.view0', ['ngRoute'])

view0.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view0/', {
    templateUrl: 'view0/view0.html',
    controller: 'View0Ctrl',
    controllerAs: '$ctrl'
  });
}]);

view0.controller('View0Ctrl', ['$scope', '$location', function ($scope, $location) {
  this.go = function (path) {
    if (this.form.$invalid) {
      this.form.$setDirty();
      return;
    }
    $location.path(path);
  };
}]);