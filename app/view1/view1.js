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
  var numbersToAccumulate = [];
      
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
  
  $scope.onSubmit = function onSubmit(number) {
    numbersToAccumulate.push(number);
  }
  
  $scope.toggle();
  
  var totalFrequencies = {};
  function writeFrequencies() { 
    
    function countFrequencies(frequencies, num) {
      frequencies[num] = (frequencies[num] + 1) || 1;
      return frequencies;
    }
    
    totalFrequencies = numbersToAccumulate.reduce(countFrequencies, totalFrequencies);
    numbersToAccumulate = [];
    
    $scope.output.push({ 
      timestamp: new Date(), 
      message: totalFrequencies
    });
  }
}]);