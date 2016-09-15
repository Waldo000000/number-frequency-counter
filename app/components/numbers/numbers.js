'use strict';

var numbers = angular.module('myApp.numbers', []);
numbers.component('numbers', {
  bindings: {
    list: '='
  },
  templateUrl: 'components/numbers/numbers.html',
  controller: function () {
    this.submit = function submit(number) {
      this.list = this.list.concat(number);
      this.number = null;
    }
  }   
});
