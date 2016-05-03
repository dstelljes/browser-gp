/**
 * @file
 * Contains the problem class.
 */

/**
 * @typedef {Object} Case
 * A case that describes the desired output of an evolved program based on some
 * inputs.
 * @property {Object.<symbol, number>} inputs
 * Input values keyed by variable symbol.
 * @property {number} output
 * The expected output.
 */

'use strict';

// Default functions:
var add = require('./functions/addition');
var sub = require('./functions/subtraction');
var mul = require('./functions/multiplication');
var div = require('./functions/protected_division');

// Default generator:
var grow = require('./generators/grow');

// Default PRNG instance:
var random = require('./random/native')();

// Default scorer:
var error = require('./fitness/error');

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

/**
 * The test cases to score evolved programs against.
 * @type {Array.<Case>}
 */
Problem.prototype.cases = [];

/**
 * The constant set.
 * @type {Array.<boolean|number|string>}
 */
Problem.prototype.constants = [];

/**
 * The maximum depth a program can have.
 * @type number
 */
Problem.prototype.depth = 5;

/**
 * The function set. By default, includes addition, subtraction, multiplication,
 * and protected division.
 * @type {Array.<function>}
 */
Problem.prototype.functions = [add, sub, mul, div];

/**
 * The generator factory. Provides a program generator at runtime. By default,
 * uses the grow generator at the specified maximum depth.
 */
Problem.prototype.generator = function() {
  return grow(this.functions, [].concat(this.constants, this.variables), this.random);
};

/**
 * The random number generator. By default, Math.random.
 */
Problem.prototype.random = random;

/**
 * The scorer factory. Provides a scorer at runtime. By default, creates an
 * error scorer on the supplied test cases.
 * @type {function}
 */
Problem.prototype.scorer = function() {
  return error(this.cases);
};

/**
 * The variable set. Should match the variables needed by the test cases.
 * @type {Array.<symbol>}
 */
Problem.prototype.variables = [];
