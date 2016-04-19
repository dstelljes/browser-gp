/**
 * @file
 * Tests the symbolic regression functions.
 */

'use strict';

var gp = require('../../library');

describe('symbolic regression problem', function() {
  it('correctly calulates fitness', function() {
    var fitness = gp.SymbolicRegression.fitness(['x'], [{
      inputs: {
        x: -2
      },
      output: -4
    }, {
      inputs: {
        x: 0
      },
      output: 0
    }, {
      inputs: {
        x: 2
      },
      output: 4
    }]);

    expect(fitness).toBe(4);
  });
});
