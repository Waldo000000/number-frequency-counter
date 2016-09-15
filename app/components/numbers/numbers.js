'use strict';

var numbers = angular.module('myApp.numbers', []);
numbers.component('numbers', {
  bindings: {
    list: '='
  },
  templateUrl: 'components/numbers/numbers.html',
  controller: function () {
    this.submit = function submit(number) {
      if (this.numberForm.$invalid) {
        this.numberForm.$setDirty();
        return;
      }
      this.list.push(number);
      this.wasFibonacciEntered = isFibonacci(number);
      this.number = null;
      this.numberForm.$setPristine();
    }
    
    var isFibonacci = function isFibonacci(number) {
      return number == 3; // TODO
    }
  }   
});
