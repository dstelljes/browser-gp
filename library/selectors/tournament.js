/**
 * @file
 * Provides tournament selection.
 */

'use strict';

/**
 * Creates a selection function that picks the fittest individual from a random
 * sample of the population.
 *
 * @function
 * @memberof selectors
 *
 * @param {number} size
 * The tournament size (i.e. the number of random individuals that will compete
 * to be the parent).
 *
 * @param {PRNG} random
 * The random number generator to use when selecting the individuals in the
 * tournament.
 *
 * @param {Scorer} scorer
 * The fitness function to use for scoring.
 *
 * @param {boolean} [maximize=false]
 * Whether higher fitness scores are considered better than lower fitness scores.
 *
 * @return {Selector}
 */
var tournament = module.exports = function(size, random, scorer, maximize) {
  return function(population) {
    var sample = [];

    for (var i = 0; i < size; i++) {
      sample.push(random.from(population));
    }

    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

    var scores = sample.map(function(individual, index) {
      return {
        index: index,
        score: scorer(individual)
      };
    }).sort(function(a, b) {
      return +(a.score > b.score) || +(a.score === b.score) - 1;
    });

    var best = maximize ? scores.length - 1 : 0;
    return sample[scores[best].index];
  };
};
