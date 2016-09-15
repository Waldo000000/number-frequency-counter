'use strict';

var view1 = angular.module('myApp.view1', ['ngRoute'])

view1.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1/:interval', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]);

view1.controller('View1Ctrl', ['$scope', '$interval', '$routeParams', function ($scope, $interval, $routeParams) {
  var interval = $routeParams.interval;
      
  $scope.output = [];
  $scope.numbers = [];
  
  $scope.toggle = function toggle() {
    if ($scope.running) {
      $interval.cancel($scope.running);
      $scope.running = null;
    }
    else {      
      $scope.running = $interval(writeFrequencies, interval);
    }
  };
  
  $scope.quit = function quit() {
    $interval.cancel($scope.running);
    $scope.hasQuit = true;
  }
  
  $scope.toggle();
  
  function writeFrequencies() { 
    
    function countFrequencies(frequencies, num) {
      frequencies[num] = (frequencies[num] + 1) || 1;
      return frequencies;
    }
    
    $scope.output = $scope.output.concat({ 
      timestamp: new Date(), 
      message: $scope.numbers.reduce(countFrequencies, {})
    });
  }
}]);