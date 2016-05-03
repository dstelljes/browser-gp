/**
 * @file
 * Implements the full generator.
 */

'use strict';

/**
 * Creates a function that builds a full program tree of the maximum depth is
 * reached (as opposed to the grow generator, which may not reach the maximum
 * depth or result in a full tree).
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
 * @returns {Generator}
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
