'use strict';

angular.module('myApp.fibonacciNumbers', []).component('fibonacciNumbers', {
  bindings: {
    onSubmit: '&'
  },
  templateUrl: 'components/fibonacciNumbers/fibonacciNumbers.html',
  controller: function () {
    this.submit = function submit(number) {
      if (this.numberForm.$invalid) {
        this.numberForm.$setDirty();
        return;
      }
      this.onSubmit({ number: number });
      this.number = null;
      this.numberForm.$setPristine();
    }
  }   
});