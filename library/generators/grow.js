/**
 * @file
 * Implements the grow generator.
 */

/**
 * Generates a program by picking randomly from the function and terminal sets.
 *
 * @callback generators~GrowGenerator
 *
 * @param {number} depth
 * The maximum depth that a generated tree can have (specifically, the depth of
 * the deepest leaf assuming the root is depth 0).
 *
 * @returns {Program}
 *
 * @see http://cswww.essex.ac.uk/staff/rpoli/gp-field-guide/22InitialisingthePopulation.html#7_2
 */

'use strict';

/**
 * Creates a grow generator.
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
 * @returns {generators~GrowGenerator}
 */
var grow = module.exports = function(functions, terminals, random) {
  var p = terminals.length / (functions.length + terminals.length);

  var recurse = function(depth) {
    var tree = [];

    if (depth === 0 || random.double() < p) {
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
