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

/**
 * Creates a crossover operator.
 *
 * @function
 * @memberof operators
 *
 * @param {PRNG} prng
 * The random number generator to use for selecting crossover points.
 *
 * @returns {operators~CrossoverOperator}
 */
var crossover = module.exports = function(prng) {
  return function(a, b) {
    
  };
};
