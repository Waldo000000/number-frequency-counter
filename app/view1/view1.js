'use strict';

var view1 = angular.module('myApp.view1', ['ngRoute'])

view1.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]);

view1.controller('View1Ctrl', ['$scope', '$interval', function ($scope, $interval) {
  var interval = 1000;
      
  $scope.output = [];
  
  $scope.toggle = function toggle() {
    if ($scope.running) {
      $interval.cancel($scope.running);
      $scope.running = null;
    }
    else {      
      $scope.running = $interval(writeFrequencies, interval);
    }
  };
  
  $scope.toggle();
  
  function writeFrequencies() { 
    $scope.output = $scope.output.concat({ timestamp: new Date(), message: 'Frequencies to be written here' });
  }
}]);