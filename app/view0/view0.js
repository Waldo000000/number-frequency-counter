'use strict';

var view1 = angular.module('myApp.view0', ['ngRoute'])

view1.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view0/', {
    templateUrl: 'view0/view0.html',
    controller: 'View0Ctrl',
    controllerAs: '$ctrl'
  });
}]);

view1.controller('View0Ctrl', ['$scope', function ($scope, $interval) {
  // var numbersToAccumulate = [];
  //     
  // $scope.output = [];
  // $scope.numbers = [];
  // 
  // $scope.toggle = function toggle() {
  //   if ($scope.running) {
  //     $interval.cancel($scope.running);
  //     $scope.running = null;
  //   }
  //   else {      
  //     $scope.running = $interval(writeFrequencies, interval);
  //   }
  // };
  // 
  // $scope.quit = function quit() {
  //   $interval.cancel($scope.running);
  //   $scope.hasQuit = true;
  // }
  // 
  // $scope.onSubmit = function onSubmit(n) {
  //   numbersToAccumulate.push(n);
  // }
  // 
  // $scope.toggle();
  // 
  // var totalFrequencies = {};
  // function writeFrequencies() { 
  //   
  //   function accumulateFrequencies(frequencies, n) {
  //     frequencies[n] = (frequencies[n] + 1) || 1;
  //     return frequencies;
  //   }
  //   
  //   totalFrequencies = numbersToAccumulate.reduce(accumulateFrequencies, totalFrequencies);
  //   numbersToAccumulate = [];
  //   
  //   $scope.output.push({ 
  //     timestamp: new Date().toLocaleString(), 
  //     message: format(totalFrequencies)
  //   });
  //   
  //   function format(frequencies) {
  //     var sortedNumbers = Object.keys(frequencies).sort(function (a, b) { return frequencies[b] - frequencies[a] });
  //     return sortedNumbers.map(function (n) { return n + ':' + frequencies[n] }).join(',');
  //   }
  // }
}]);