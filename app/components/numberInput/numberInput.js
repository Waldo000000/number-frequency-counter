'use strict';

angular.module('myApp.numberInput', []).component('numberInput', {
  bindings: {
    onSubmit: '&'
  },
  templateUrl: 'components/numberInput/numberInput.html',
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