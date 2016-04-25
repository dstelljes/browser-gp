/**
 * @file
 * Tests the crossover mutation.
 */

'use strict';

var gp = require('../../../library');

var add = gp.functions.addition;
var sub = gp.functions.subtraction;
var mul = gp.functions.multiplication;
var div = gp.functions.division;

describe('crossover mutation', function() {
  it('performs a crossover on two trees', function() {
    // (* 2 (/ 8 4))
    var even = [mul, 2, div, 8, 4];

    // (+ (- 3 6) 9)
    var odd = [add, sub, 3, 6, 9];
  });
});
