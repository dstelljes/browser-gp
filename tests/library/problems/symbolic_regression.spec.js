/**
 * @file
 * Tests the symbolic regression functions.
 */

'use strict';

var SymbolicRegression = require('../../../library/problems/symbolic_regression');

describe('symbolic regression problem', function() {
  it('correctly calulates fitness', function(done) {
    SymbolicRegression.fitness(['x'], [{
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
    }]).then(function(result) {
      expect(result).toBe(4);
    }).then(done);
  });
});
