/**
 * @file
 * Contains the symbolic regression problem type.
 *
 * @since 2016-04-19
 */

/**
 * @typedef {Object} FitnessCase
 * A case that describes the desired output of the evolved programs based on
 * some inputs.
 * @property {Object.<string, number>} inputs
 * Input values keyed by variable name.
 * @property {number} output
 * The expected output.
 */

/**
 * @typedef {Object} Target
 * The dataset to be used in the regression.
 * @property {Array.<FitnessCase>} cases
 * The set of cases to score evolved programs against.
 * @property {Array.<string>} variables
 * Variable names that can be used when evolving programs.
 */

'use strict';

var evaluate = require('../program').evaluate;

/**
 * @class SymbolicRegression
 * @classdesc
 * Defines a symbolic regression problem. Uses a set of expressions to evolve a
 * model that matches a collection of inputs/outputs.
 *
 * Constructs a symbolic regression instance.
 */
var SymbolicRegression = module.exports = function() {
  //
};

/**
 * Calculates the error of a program on a target case.
 * @memberof SymbolicRegression
 *
 * @param {Program} program
 * A program respresentation.
 *
 * @param {FitnessCase} test
 * The fitness case to evaluate. (`case` is a reserved word.)
 *
 * @return {Promise<number>}
 * A promise that resolves with the difference between the expected value and
 * the actual value.
 */
var error = SymbolicRegression.error = function(program, test) {
  return evaluate(program, test.inputs).then(function(actual) {
    return Math.abs(actual - test.output);
  });
};

/**
 * Evaluates the fitness of a program for a set of target cases.
 * @memberof SymbolicRegression
 *
 * @param {Program} program
 * A program respresentation.
 *
 * @param {Array.<FitnessCase>} tests
 * The fitness cases to evaluate.
 *
 * @return {Promise<number>}
 * A promise that resolves with the result of the evaluation (i.e. the sum of
 * the errors).
 */
var fitness = SymbolicRegression.fitness = function(program, tests) {
  return Promise.all(tests.map(function(test) {
    return error(program, test);
  })).then(function(results) {
    return results.reduce(function(previous, current) {
      return previous + current;
    }, 0);
  });
};
