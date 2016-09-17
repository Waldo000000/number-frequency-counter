'use strict';

describe('myApp.fibonacciNumbers module', function() {
  beforeEach(module('myApp.fibonacciNumbers'));
  
  describe('fibonacciNumbers controller', function () {
    
    var $componentController, sut,
      bindings = { 
        number: '',
        onSubmit: function () {}
      };

    beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_; //tfsbad: inline with next beforeEach, remove $componentController var
    }));
    
    beforeEach(function() {
      sut = $componentController('fibonacciNumbers', null, bindings);
      
      sut.numberForm = { // stub FormController
        $setDirty: jasmine.createSpy('$setDirty'),
        $setPristine: jasmine.createSpy('$setPristine')
      };
    });
    
    describe('wasFibonacciEntered', function () {
      
      it('is initially false', function () {
        expect(sut.wasFibonacciEntered).toBe(false);
      });
      
      it('is false for non-positive integers', function () {
        var notFibonnaciNumbers = [-100, -10, -1, 0, -0.5, 0.5, 1.1];
        
        notFibonnaciNumbers.forEach(function (n) {
          sut.submit(n)
          expect(sut.wasFibonacciEntered).toBe(false);
        }, this);
      });
      
      it('is true after entering a small Fibonacci number, else false', function () {
        var fibonacciNumbers = [1, 2, 3, 5, 8, 13];
        
        for (var n = 1; n < Math.max.apply(Math, fibonacciNumbers); n++) {
          sut.submit(n);
          var expected = fibonacciNumbers.indexOf(n) >= 0;
          expect(sut.wasFibonacciEntered).toBe(expected,
            'Expected ' + n
            + (expected ? ' to be' : ' to not be')
            + ' a Fibonacci number');
        };
      });
    });
  });
});
