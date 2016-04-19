/**
 * @file
 * Tests the program utility functions.
 */

'use strict';

var gp = require('../../library');

var add = gp.functions.addition;
var sub = gp.functions.subtraction;
var mul = gp.functions.multiplication;
var div = gp.functions.division;
var exp = gp.functions.exponentiation;
var log = gp.functions.logarithm;
var sin = gp.functions.sine;

describe('program evaluation', function() {
  // (3 + 6) / 9
  // (/ (+ 3 6) 9)
  var boring = [div, add, 3, 6, 9];

  // lg(64) / lg(x)
  // (/ (log 64 2) (log x 2))
  var base = [div, log, 64, 2, log, 'x', 2];

  // x^3 - y^2 - 5z^2 + 4xy + 6
  // (+ (+ (- (- (* x (* x x)) (* y y)) (* 5 (* z z))) (* 4 (* x y))) 6)
  var polynomial = [add, add, sub, sub, mul, 'x', mul, 'x', 'x', mul, 'y', 'y', mul, 5, mul, 'z', 'z', mul, 4, mul, 'x', 'y', 6];

  // 1 - 2sin^2(x)
  // (- 1 (* 2 (^ (sin x) 2)))
  var identity = [sub, 1, mul, 2, exp, sin, 'x', 2];

  it('correctly evaluates a program with no variables', function() {
    var result = gp.program.evaluate(boring);
    expect(result).toBe(1);
  });

  it('correctly evaluates a program with one variable', function() {
    var result = gp.program.evaluate(base, {
      x: 8
    });

    expect(result).toBe(2);
  });

  it('correctly evaluates a program with several variables', function() {
    var result = gp.program.evaluate(polynomial, {
      x: 1,
      y: 2,
      z: 0
    });

    expect(result).toBe(11);
  });

  it('correctly evaluates a program with functions of different arities', function() {
    var result = gp.program.evaluate(identity, {
      x: Math.PI
    });

    expect(result).toBe(1);
  });
});
