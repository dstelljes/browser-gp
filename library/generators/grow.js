/**
 * @file
 * Implements the grow generator.
 */

'use strict';

/**
 * Creates a function that generates a program by picking randomly from the
 * function and terminal sets until a maximum depth is reached.
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
