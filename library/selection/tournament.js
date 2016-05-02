/**
 * @file
 * Provides tournament selection.
 */

/**
 * Selects the fittest individual from a random selection of the given
 * population.
 *
 * @callback selection~TournamentSelection
 *
 * @param {Array.<Program>} population
 * The population on which to run the tournament.
 *
 * @returns {Program}
 * The fittest individual from the random pool.
 */

'use strict';

/**
 * Creates a tournament selection function.
 *
 * @function
 * @memberof selection
 *
 * @param {number} size
 * The tournament size (i.e. the number of random individuals that will compete
 * to be the parent).
 *
 * @param {PRNG} random
 * The random number generator to use when selecting the individuals in the
 * tournament.
 *
 * @param {function(Program)} scorer
 * The fitness function to use for scoring.
 *
 * @param {boolean} [maximize=false]
 * Whether higher fitness scores are considered better than lower fitness scores.
 *
 * @return {selection~TournamentSelection}
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
