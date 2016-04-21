/**
 * @file
 * Contains the problem class.
 */

/**
 * @typedef {Object} Case
 * A case that describes the desired output of an evolved program based on some
 * inputs.
 * @property {Object.<string, number>} inputs
 * Input values keyed by variable name.
 * @property {number} output
 * The expected output.
 */

/**
 * @typedef {Object} Target
 * The dataset to be used in the regression.
 * @property {Array.<Case>} cases
 * The set of cases to score evolved programs against.
 * @property {Array.<string>} variables
 * Variable names that can be used when evolving programs.
 */

'use strict';

/**
 * Constructs a problem instance.
 *
 * @class Problem
 * @classdesc
 * Defines a symbolic regression problem. Uses a set of expressions to evolve a
 * model that matches a collection of inputs/outputs.
 */
var Problem = module.exports = function() {
  //
};
