/**
 * @file
 * Tests the "random" value wheel.
 */

'use strict';

var gp = require('../../../library');

describe('wheel PRNG', function() {
  it('cycles through provided values', function() {
    var wheel = gp.random.wheel([0.2, 0.4, 0.6]);

    expect(wheel.double()).toBe(0.2);
    expect(wheel.double()).toBe(0.4);
    expect(wheel.double()).toBe(0.6);
    expect(wheel.double()).toBe(0.2);
  });
});
