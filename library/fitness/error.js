/**
 * @file
 * Provides the standard |actual - expected| fitness measure.
 */

'use strict';

var evaluate = require('../program').evaluate;

/**
 * Calculates the error of a program on a target case.
 *
 * @function
 * @private
 *
 * @param {Program} program
 * A program respresentation.
 *
 * @param {Case} test
 * The fitness case to evaluate. (`case` is a reserved word.)
 *
 * @returns {number}
 * The difference between the actual value and the expected value.
 */
var difference = function(program, test) {
  return Math.abs(evaluate(program, test.inputs) - test.output);
};

/**
 * Creates a scorer that returns the fitness of a program as the sum of test
 * case errors.
 *
 * @function
 * @memberof fitness
 *
 * @param {Array.<Case>} tests
 * The fitness cases to evaluate.
 *
 * @returns {Scorer}
 */
var error = module.exports = function(tests) {
  return function(program) {
    var sum = 0;

    for (var index in tests) {
      sum += difference(program, tests[index]);
    }

    return sum;
  };
};
