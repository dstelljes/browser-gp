/**
 * @file
 * Provides the crossover operator.
 */

/**
 * Performs a crossover on two programs.
 *
 * @callback operators~CrossoverOperator
 *
 * @param {Program} a
 * @param {Program} b
 *
 * @returns {Program}
 */

'use strict';

var splice = Array.prototype.splice;
var program = require('../program');

/**
 * Creates a crossover operator.
 *
 * @function
 * @memberof operators
 *
 * @param {PRNG} random
 * The random number generator to use for selecting crossover points.
 *
 * @returns {operators~CrossoverOperator}
 */
var crossover = module.exports = function(random) {
  return function(a, b) {
    // Get crossover points:
    var ax = random.integer(0, a.length);
    var bx = random.integer(0, b.length);

    // Quick and easy way to clone an array:
    // @see https://davidwalsh.name/javascript-clone-array
    var child = a.slice(0);

    // Get the replacement subtree from b:
    var args = program.extractSubtree(b, bx);

    // To build the arguments for splice, we're going to prepend the start and
    // delete count arguments to the subtree array:
    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    args.unshift(ax, program.findSubtreeLength(a, ax));

    // Insert the replacement subtree on a:
    splice.apply(child, args);

    return child;
  };
};
