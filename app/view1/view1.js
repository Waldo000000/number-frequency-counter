'use strict';

var view1 = angular.module('myApp.view1', ['ngRoute'])

view1.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]);

view1.controller('View1Ctrl', ['$scope', '$interval', function ($scope, $interval) {
  $scope.output = [];
  
  function writeFrequencies() { 
    $scope.output = $scope.output.concat({ timestamp: new Date(), message: 'Frequencies to be written here' });
  }
  
  var writingFrequencies = $interval(writeFrequencies, 1000);
}]);