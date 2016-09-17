'use strict';

describe('myApp.frequencies module', function() {
  beforeEach(module('myApp.frequencies'));
  
  describe('frequencies controller', function () {
    
    var sut;

    beforeEach(inject(function(_$controller_) {
      sut = _$controller_('FrequenciesCtrl', null, null);
    }));
    
    describe('output', function () {
      
      it('is initially empty', function () {
        expect(sut.output).toEqual([]);
      });
    });
  });
});
