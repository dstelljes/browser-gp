/**
 * @file
 * Provides point mutation.
 */

'use strict';

/**
 * Creates a point mutation operator.
 *
 * @function
 * @memberof mutators
 *
 * @param {Array} primitives
 * An array of possible primitives to substitute.
 *
 * @param {number} probability
 * The per-node probability that a mutation will take place.
 *
 * @param {PRNG} random
 * The random number generator to use for selecting crossover points.
 *
 * @returns {Mutator}
 */
var point = module.exports = function(primitives, probability, random) {
  var match = function(primitive) {
    // To ensure that all primitives have a chance to be selected, shuffle:
    random.shuffle(primitives);

    for (var i = 0; i < primitives.length; i++) {
      // Make sure types match:
      // @TODO: what about symbols?
      if (typeof primitive !== typeof primitives[i]) {
        continue;
      }

      // Make sure arities match:
      if (typeof primitive === 'function' && primitive.length !== primitives[i].length) {
        continue;
      }

      return primitives[i];
    }
  };

  return function(parent) {
    // Quick and easy way to clone an array:
    // @see https://davidwalsh.name/javascript-clone-array
    var child = parent.slice(0);

    for (var i = 0; i < parent.length; i++) {
      if (random.double() > probability) {
        continue;
      }

      var substitute = match(parent[i]);

      // Only do the mutation if there's something that will reasonably fit:
      if (!substitute) {
        continue;
      }

      child[i] = substitute;
    }

    return child;
  };
};
