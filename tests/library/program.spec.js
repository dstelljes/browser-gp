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
var join = gp.functions.concatenation;
var count = gp.functions.count;

describe('program evaluation', function() {
  var x = Symbol(), y = Symbol(), z = Symbol();

  // (3 + 6) / 9
  // (/ (+ 3 6) 9)
  var boring = [div, add, 3, 6, 9];

  // lg(64) / lg(x)
  // (/ (log 64 2) (log x 2))
  var base = [div, log, 64, 2, log, x, 2];

  // x^3 - y^2 - 5z^2 + 4xy + 6
  // (+ (+ (- (- (* x (* x x)) (* y y)) (* 5 (* z z))) (* 4 (* x y))) 6)
  var polynomial = [add, add, sub, sub, mul, x, mul, x, x, mul, y, y, mul, 5, mul, z, z, mul, 4, mul, x, y, 6];

  // 1 - 2sin^2(x)
  // (- 1 (* 2 (^ (sin x) 2)))
  var identity = [sub, 1, mul, 2, exp, sin, x, 2];

  // ( - (count (join x "cake")) 4)
  var compound = [sub, count, join, x, 'cake', 4];

  it('evaluates a program with no variables', function() {
    var result = gp.program.evaluate(boring);
    expect(result).toBe(1);
  });

  it('evaluates a program with one variable', function() {
    var result = gp.program.evaluate(base, {
      [x]: 8
    });

    expect(result).toBe(2);
  });

  it('evaluates a program with several variables', function() {
    var result = gp.program.evaluate(polynomial, {
      [x]: 1,
      [y]: 2,
      [z]: 0
    });

    expect(result).toBe(11);
  });

  it('evaluates a program with functions of different arities', function() {
    var result = gp.program.evaluate(identity, {
      [x]: Math.PI
    });

    expect(result).toBe(1);
  });

  it('evaluates a program with different primitive types', function() {
    var result = gp.program.evaluate(compound, {
      [x]: 'fruit'
    });

    expect(result).toBe(5);
  });
});

describe('subtree extraction', function() {
  var x = Symbol();

  // (+ 2 3)
  var simple = [add, 2, 3];

  // (+ (- 1 2) 3)
  var nested = [add, sub, 1, 2, 3];

  // (/ (log 64 2) (log x 2))
  var base = [div, log, 64, 2, log, x, 2];

  it('extracts a one-node subtree', function() {
    expect(gp.program.extractSubtree(simple, 1)).toEqual([2]);
  });

  it('extracts a multiple-node subtree', function() {
    expect(gp.program.extractSubtree(nested, 1)).toEqual([sub, 1, 2]);
  });

  it('returns the entire tree when given the root', function() {
    expect(gp.program.extractSubtree(base, 0)).toEqual(base);
  });
});
