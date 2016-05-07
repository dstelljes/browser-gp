/**
 * @file
 * Tests the PRNG class.
 */

'use strict';

var gp = require('../../library');

describe('PRNG class', function() {
  var wheel = gp.random.wheel([0.1, 0.5, 0.9]);

  it('returns double values unmodified if no bounds are specified', function() {
    expect(wheel.double()).toBe(0.1);
    expect(wheel.double()).toBe(0.5);
    expect(wheel.double()).toBe(0.9);
  });

  it('returns double values in range [lower, 1)', function() {
    expect(wheel.double(-1)).toBe(-0.8);
    expect(wheel.double(0)).toBe(0.5);
    expect(wheel.double(1)).toBe(1);
  });

  it('returns double values in range [lower, upper)', function() {
    expect(wheel.double(-10, 10)).toBe(-8);
    expect(wheel.double(-5, 5)).toBe(0);
    expect(wheel.double(-20, 20)).toBe(16);
  });

  it('returns values from an array', function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(wheel.from(array)).toBe(1);
    expect(wheel.from(array)).toBe(5);
    expect(wheel.from(array)).toBe(9);
  });

  it('returns integer values in range [0, upper)', function() {
    expect(wheel.integer(10)).toBe(1);
    expect(wheel.integer(5)).toBe(2);
    expect(wheel.integer(20)).toBe(18);
  });

  it('returns integer values in range [lower, upper)', function() {
    expect(wheel.integer(-10, 10)).toBe(-8);
    expect(wheel.integer(-5, 5)).toBe(0);
    expect(wheel.integer(-20, 20)).toBe(16);
  });

  it('shuffles an array', function() {
    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(wheel.shuffle(array)).toEqual([5, 2, 9, 6, 8, 3, 0, 7, 4, 1]);
  });
});
