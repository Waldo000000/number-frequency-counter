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
  
  $scope.onSubmit = function onSubmit(n) {
    numbersToAccumulate.push(n);
  }
  
  $scope.toggle();
  
  var totalFrequencies = {};
  function writeFrequencies() { 
    
    function accumulateFrequencies(frequencies, n) {
      frequencies[n] = (frequencies[n] + 1) || 1;
      return frequencies;
    }
    
    totalFrequencies = numbersToAccumulate.reduce(accumulateFrequencies, totalFrequencies);
    numbersToAccumulate = [];
    
    $scope.output.push({ 
      timestamp: new Date(), 
      message: format(totalFrequencies)
    });
    
    function format(frequencies) {
      var sortedNumbers = Object.keys(frequencies).sort(function (a, b) { return frequencies[b] - frequencies[a] });
      return sortedNumbers.map(function (n) { return n + ':' + frequencies[n] }).join(',');
    }
  }
}]);