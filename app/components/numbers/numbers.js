'use strict';

var numbers = angular.module('myApp.numbers', []);
numbers.component('numbers', {
  bindings: {
    onSubmit: '&'
  },
  templateUrl: 'components/numbers/numbers.html',
  controller: function () {
    this.submit = function submit(number) {
      if (this.numberForm.$invalid) {
        this.numberForm.$setDirty();
        return;
      }
      this.onSubmit({ number: number });
      this.wasFibonacciEntered = isFibonacci(number);
      this.number = null;
      this.numberForm.$setPristine();
    }
    
    // From Binet's formula (https://en.wikipedia.org/wiki/Fibonacci_number#Recognizing_Fibonacci_numbers)
    function isFibonacci(n)
    {
      var x = 5 * n * n;
      return isSquare(x + 4) || isSquare(x - 4);

      function isSquare(n)
      {
        return n > 0 && Math.sqrt(n) % 1 === 0;
      }
    }
  }   
});
