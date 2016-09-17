'use strict';

var frequencies = angular.module('myApp.frequencies', ['ngRoute'])

frequencies.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/frequencies/:interval', {
    templateUrl: 'frequencies/frequencies.html',
    controller: 'FrequenciesCtrl',
    controllerAs: '$ctrl'
  });
}]);

frequencies.controller('FrequenciesCtrl', ['$interval', '$routeParams', FrequenciesCtrl]);
function FrequenciesCtrl($interval, $routeParams) {

  var interval = $routeParams.interval;
  var frequencies = {};
  this.output = [];

  this.onSubmit = function onSubmit(n) {
    frequencies[n] = (frequencies[n] + 1) || 1;
    this.lastSubmitted = n;
  }
  
  this.toggle = function toggle() {
    if (this.running) {
      $interval.cancel(this.running);
      this.running = null;
    }
    else {
      this.running = $interval(this._writeFrequencies.bind(this), interval * 1000);
    }
  };

  this.quit = function quit() {
    $interval.cancel(this.running);
    this._writeFrequencies();
    this.hasQuit = true;
  }
  
  this._writeFrequencies = function _writeFrequencies() {
    this.output.push({
      timestamp: new Date().toLocaleString(),
      message: formattedSortedFrequencies(frequencies)
    });

    function formattedSortedFrequencies(frequencies) {
      var sortedNumbers = Object.keys(frequencies).sort(function (a, b) { return frequencies[b] - frequencies[a] });
      return sortedNumbers.map(function (n) { return n + ':' + frequencies[n] }).join(', ');
    }
  }

  this.toggle(); // Begin!
}