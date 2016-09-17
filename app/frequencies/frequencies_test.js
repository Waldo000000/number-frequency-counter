'use strict';

describe('myApp.frequencies module', function() {
  beforeEach(module('myApp.frequencies'));
  
  describe('frequencies controller', function () {
    
    var sut, $interval,
      interval = 1;

    beforeEach(inject(function(_$controller_, _$interval_) {
      sut = _$controller_('FrequenciesCtrl', { $routeParams: { interval: interval } });
      $interval = _$interval_;
    }));
    
    describe('output', function () {
      
      it('is initially empty', function () {
        expect(sut.output).toEqual([]);
      });
      
      it('has not quit', function () {
        expect(sut.hasQuit).toBeFalsy();
      })
      
      describe('after some numbers submitted', function () {
        beforeEach(function () {
          sut.onSubmit(10);
          sut.onSubmit(10);
          sut.onSubmit(8);
        });
        
        it('sets last submitted number on controller', function () {
          expect(sut.lastSubmitted).toBe(8);
        });
        
        it('still has no output', function () {
          expect(sut.output).toEqual([]);
        });
        
        describe('after interval has passed', function () {
          beforeEach(function () {
            $interval.flush(1000);
          });
          
          it('outputs formatted, sorted frequency counts', function () {
            expect(sut.output.length).toBe(1);
            expect(sut.output[0].message).toBe('10:2, 8:1');
          })
          
          describe('timer paused, number is submitted, and more than the interval passes', function () {
            beforeEach(function () {
              sut.toggle();
              sut.onSubmit(10);
              $interval.flush(5000);
            });
            
            it('outputs no more while paused', function () {
              expect(sut.output.length).toBe(1);
              expect(sut.output[0].message).toBe('10:2, 8:1');
            });
            
            describe('timer resumes, numbers are submitted, and interval passes', function () {
              beforeEach(function () {
                sut.toggle();
                sut.onSubmit(8);
                sut.onSubmit(33);
                $interval.flush(1000);
              });
              
              it('appends new frequency counts to output', function () {
                expect(sut.output.length).toBe(2);
                expect(sut.output[1].message).toBe('10:3, 8:2, 33:1');
              });
              
              describe('interval passes with no new input', function () {
                beforeEach(function () {
                  $interval.flush(1000);
                });
                
                it('appends same frequency counts to output', function () {
                  expect(sut.output.length).toBe(3);
                  expect(sut.output[2].message).toBe('10:3, 8:2, 33:1');
                });
              });
              
              describe('more numbers submitted then quits', function () {
                beforeEach(function () {
                  sut.onSubmit(10);
                  sut.quit();
                });
                
                it('appends new frequency counts to output', function () {
                  expect(sut.output.length).toBe(3);
                  expect(sut.output[2].message).toBe('10:4, 8:2, 33:1');
                });
                
                it('has quit', function() {
                  expect(sut.hasQuit).toBe(true);
                });
                
                describe('interval lapses after quit', function () {
                  beforeEach(function () {
                    $interval.flush(1000);
                  });
                  
                  it('outputs no more while paused', function () {
                    expect(sut.output.length).toBe(3);
                    expect(sut.output[2].message).toBe('10:4, 8:2, 33:1');
                  });
                });
              });
            })
          })
        });
      });
    });
  });
});
