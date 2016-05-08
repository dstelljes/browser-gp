/**
 * @file
 * Tests point mutation.
 */

'use strict';

var gp = require('../../../library');

var add = gp.functions.addition;
var sub = gp.functions.subtraction;
var mul = gp.functions.multiplication;
var div = gp.functions.division;
var log = gp.functions.logarithm;
var sin = gp.functions.sine;
var count = gp.functions.count;

describe('point mutation', function() {
  it('mutates at the specified probability', function() {
    var x = Symbol();

    // (* (- (+ 2 3) (count "fish")) (sin x))
    var program = [mul, sub, add, 2, 3, count, 'fish', sin, x];

    var wheel = gp.random.wheel([0, 0, 0, 1, 1]);
    var mutate = gp.mutators.point([4, 6, 'whale', 'emu', div, log], 0.75, wheel);

    expect(mutate(program)).toEqual([div, log, add, 4, 3, count, 'whale', sin, x]);
  });
});
