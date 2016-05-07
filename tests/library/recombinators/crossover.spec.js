/**
 * @file
 * Tests the crossover recombinator.
 */

'use strict';

var gp = require('../../../library');

var add = gp.functions.addition;
var sub = gp.functions.subtraction;
var mul = gp.functions.multiplication;
var div = gp.functions.division;

describe('crossover', function() {
  it('replaces subtrees', function() {
    // (* 2 (/ 8 4))
    var even = [mul, 2, div, 8, 4];

    // (+ (- 3 6) 9)
    var odd = [add, sub, 3, 6, 9];

    // This ensures that the crossover point for even (a) will be 2 and that the
    // crossover point for odd (b) will be 1 because of how the random number
    // generator converts doubles to integers:
    // @see PRNG#integer
    var wheel = gp.random.wheel([0.4, 0.2]);
    expect(wheel.integer(0, even.length)).toBe(2);
    expect(wheel.integer(0, odd.length)).toBe(1);
    // And we only gave the wheel two values, so it's back at the beginning.

    var crossover = gp.recombinators.crossover(wheel);
    expect(crossover(even, odd)).toEqual([mul, 2, sub, 3, 6]);
  });

  it('replaces an entire tree', function() {
    // (+ (- 0 8) 6)
    var even = [add, sub, 0, 8, 6];

    // (/ 9 3)
    var odd = [div, 9, 3];

    var wheel = gp.random.wheel([0.6, 0]);
    expect(wheel.integer(0, even.length)).toBe(3);
    expect(wheel.integer(0, odd.length)).toBe(0);

    var crossover = gp.recombinators.crossover(wheel);
    expect(crossover(even, odd)).toEqual([add, sub, 0, div, 9, 3, 6]);
  });
});
