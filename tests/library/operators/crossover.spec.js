/**
 * @file
 * Tests the crossover operator.
 */

'use strict';

var gp = require('../../../library');

var add = gp.functions.addition;
var sub = gp.functions.subtraction;
var mul = gp.functions.multiplication;
var div = gp.functions.division;

describe('crossover', function() {
  it('performs a crossover on two trees', function() {
    // (* 2 (/ 8 4))
    var even = [mul, 2, div, 8, 4];

    // (+ (- 3 6) 9)
    var odd = [add, sub, 3, 6, 9];

    // This ensures that the crossover point for even (a) will be 2 and that the
    // crossover point for odd (b) will be 1 because of how the random number
    // generator converts doubles to integers:
    // @see PRNG#integer
    var wheel = gp.random.wheel([0.4, 0.2]);
    expect(wheel.integer(0, 5)).toBe(2);
    expect(wheel.integer(0, 5)).toBe(1);
    // Wheel has now output all randoms in its sequence & is back at the beginning.

    var crossover = gp.operators.crossover(wheel);
    expect(crossover(even, odd)).toEqual([mul, 2, sub, 3, 6]);
  });
});
