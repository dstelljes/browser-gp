/**
 * @file
 * Provides the crossover operator.
 */

'use strict';

var program = require('../program');

/**
 * Creates a crossover operator.
 *
 * @function
 * @memberof recombinators
 *
 * @param {PRNG} random
 * The random number generator to use for selecting crossover points.
 *
 * @returns {Recombinator}
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
    var subtree = program.extractSubtree(b, bx);

    // Remove the old subtree and insert the replacement:
    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
    child.splice(ax, program.findSubtreeLength(a, ax), ...subtree);

    return child;
  };
};
