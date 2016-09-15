'use strict';

var frequencies = angular.module('myApp.frequencies', ['ngRoute'])

frequencies.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/frequencies/:interval', {
    templateUrl: 'frequencies/frequencies.html',
    controller: 'FrequenciesCtrl',
    controllerAs: '$ctrl'
  });
}]);

frequencies.controller('FrequenciesCtrl', ['$interval', '$routeParams', function ($interval, $routeParams) {
  var interval = $routeParams.interval;
  var numbersToAccumulate = [];
      
  this.output = [];
  
  this.toggle = function toggle() {
    if (this.running) {
      $interval.cancel(this.running);
      this.running = null;
    }
    else {      
      this.running = $interval(writeFrequencies.bind(this), interval * 1000);
    }
  };
  
  this.quit = function quit() {
    $interval.cancel(this.running);
    this.hasQuit = true;
  }
  
  this.onSubmit = function onSubmit(n) {
    numbersToAccumulate.push(n);
  }
  
  this.finalTally = function finalTally() {
    return this.output[this.output.length - 1].message;
  }
  
  this.toggle();
  
  var totalFrequencies = {};
  function writeFrequencies() { 
    
    function accumulateFrequencies(frequencies, n) {
      frequencies[n] = (frequencies[n] + 1) || 1;
      return frequencies;
    }
    
    totalFrequencies = numbersToAccumulate.reduce(accumulateFrequencies, totalFrequencies);
    numbersToAccumulate = [];
    
    this.output.push({ 
      timestamp: new Date().toLocaleString(), 
      message: format(totalFrequencies)
    });
    
    function format(frequencies) {
      var sortedNumbers = Object.keys(frequencies).sort(function (a, b) { return frequencies[b] - frequencies[a] });
      return sortedNumbers.map(function (n) { return n + ':' + frequencies[n] }).join(',');
    }
  }
}]);