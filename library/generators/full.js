/**
 * @file
 * Implements the full generator.
 */

/**
 * Generates a program by picking randomly from the function and terminal sets
 * until a maximum depth is reached (as opposed to the grow generator, which may
 * not reach the maximum depth).
 *
 * @callback generators~FullGenerator
 *
 * @param {number} depth
 * The depth that a generated tree should have (specifically, the depth of the
 * deepest leaf assuming the root is depth 0).
 *
 * @returns {Program}
 *
 * @see http://cswww.essex.ac.uk/staff/rpoli/gp-field-guide/22InitialisingthePopulation.html#7_2
 */

'use strict';

/**
 * Creates a full generator.
 *
 * @function
 * @memberof generators
 *
 * @param {Array.<function>} functions
 * The function set.
 *
 * @param {Array.<number|string|symbol>} terminals
 * The terminal set.
 *
 * @param {PRNG} random
 * The random number generator to use when selecting from the function and
 * terminal sets.
 *
 * @returns {generators~FullGenerator}
 */
var full = module.exports = function(functions, terminals, random) {
  var recurse = function(depth) {
    var tree = [];

    if (depth === 0) {
      tree.push(random.from(terminals));
    }
    else {
      var fn = random.from(functions);
      tree.push(fn);

      for (var i = 0; i < fn.length; i++) {
        tree.push(...recurse(depth - 1));
      }
    }

    return tree;
  };

  return recurse;
};
