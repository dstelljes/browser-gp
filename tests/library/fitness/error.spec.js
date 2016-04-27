/**
 * @file
 * Tests the |actual - expected| fitness measure.
 */

'use strict';

var gp = require('../../../library');

describe('error fitness measure', function() {
  it('correctly calulates fitness', function() {
    var x = Symbol();

    var fitness = gp.fitness.error([x], [{
      inputs: {
        [x]: -2
      },
      output: -4
    }, {
      inputs: {
        [x]: 0
      },
      output: 0
    }, {
      inputs: {
        [x]: 2
      },
      output: 4
    }]);

    expect(fitness).toBe(4);
  });
});
