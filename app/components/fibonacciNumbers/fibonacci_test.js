'use strict';

describe('myApp.fibonacci module', function() {
  beforeEach(module('myApp.fibonacci'));
  
  describe('fibonacci controller', function () {
    
    var sut;
    var bindings = { 
      number: '', 
    };

    beforeEach(inject(function(_$componentController_) {
      sut = _$componentController_('fibonacci', null, bindings);
    }));
    
    describe('isFibonacciNumber', function () {
      
      it('is initially false', function () {
        expect(sut.isFibonacciNumber).toBe(false);
      });
      
      it('is false for non-positive integers', function () {
        var notFibonnaciNumbers = [-100, -10, -1, 0, -0.5, 0.5, 1.1];
        
        notFibonnaciNumbers.forEach(function (n) {
          sut.$onChanges({ number: { currentValue: n } });
          expect(sut.isFibonacciNumber).toBe(false);
        }, this);
      });
      
      it('is true after entering a small Fibonacci number, else false', function () {
        var fibonacci = [1, 2, 3, 5, 8, 13];
        
        for (var n = 1; n < Math.max.apply(Math, fibonacci); n++) {
          sut.$onChanges({ number: { currentValue: n } });
          var expected = fibonacci.indexOf(n) >= 0;
          expect(sut.isFibonacciNumber).toBe(expected,
            'Expected ' + n
            + (expected ? ' to be ' : ' to not be ')
            + 'a Fibonacci number');
        };
      });
    });
  });
});
