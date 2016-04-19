/**
 * @file
 * Tests the program utility functions.
 */

'use strict';

var program = require('../../library/program');

var add = require('../../library/functions/addition');
var sub = require('../../library/functions/subtraction');
var mul = require('../../library/functions/multiplication');
var div = require('../../library/functions/division');
var exp = require('../../library/functions/exponentiation');
var log = require('../../library/functions/logarithm');
var sin = require('../../library/functions/sine');

describe('program evaluation', function() {
  // lg(64) / lg(x)
  // (/ (log 64 2) (log x 2))
  var base = [div, log, 64, 2, log, 'x', 2];

  // x^3 - y^2 - 5z^2 + 4xy + 6
  // (+ (+ (- (- (* x (* x x)) (* y y)) (* 5 (* z z))) (* 4 (* x y))) 6)
  var polynomial = [add, add, sub, sub, mul, 'x', mul, 'x', 'x', mul, 'y', 'y', mul, 5, mul, 'z', 'z', mul, 4, mul, 'x', 'y', 6];

  // 1 - 2sin^2(x)
  // (- 1 (* 2 (^ (sin x) 2)))
  var identity = [sub, 1, mul, 2, exp, sin, 'x', 2];

  it('correctly evaluates a program with one variable', function(done) {
    program.evaluate(base, {
      x: 8
    }).then(function(result) {
      expect(result).toBe(2);
    }).then(done);
  });

  it('correctly evaluates a program with several variables', function(done) {
    program.evaluate(polynomial, {
      x: 1,
      y: 2,
      z: 0
    }).then(function(result) {
      expect(result).toBe(11);
    }).then(done);
  });

  it('correctly evaluates a program with functions of different arities', function(done) {
    program.evaluate(identity, {
      x: Math.PI
    }).then(function(result) {
      expect(result).toBe(1);
    }).then(done);
  });
});
