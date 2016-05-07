/**
 * @file
 * Provides fittest individual selection.
 */

'use strict';

/**
 * Creates a selection function that picks the fittest individual from the
 * entire population.
 *
 * @function
 * @memberof selectors
 *
 * @param {Scorer} scorer
 * The fitness function to use for scoring.
 *
 * @param {boolean} [maximize=false]
 * Whether higher fitness scores are considered better than lower fitness scores.
 *
 * @return {Selector}
 */
var fittest = module.exports = function(scorer, maximize) {
  return function(population) {
    var scores = population.map(function(individual, index) {
      return {
        index: index,
        score: scorer(individual)
      };
    }).sort(function(a, b) {
      return +(a.score > b.score) || +(a.score === b.score) - 1;
    });

    var best = maximize ? scores.length - 1 : 0;
    return population[scores[best].index];
  };
};
