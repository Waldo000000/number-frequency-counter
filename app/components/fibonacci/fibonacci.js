'use strict';

angular.module('myApp.fibonacci', []).component('fibonacci', {
  bindings: {
    number: '<'
  },
  templateUrl: 'components/fibonacci/fibonacci.html',
  controller: FibonacciController
});

function FibonacciController() {
  
  this.isFibonacciNumber = false;
  
  this.$onChanges = function (changesObj) {
    if (changesObj.number) {
      this.isFibonacciNumber = isFibonacci(changesObj.number.currentValue);
    }
  }
  
  // From Binet's formula (https://en.wikipedia.org/wiki/Fibonacci_number#Recognizing_Fibonacci_numbers)
  function isFibonacci(n)
  {
    if (n <= 0)
      return false;
        
    var x = 5 * n * n;
    return isSquare(x + 4) || isSquare(x - 4);

    function isSquare(n)
    {
      return n > 0 && Math.sqrt(n) % 1 === 0;
    }
  }
}   