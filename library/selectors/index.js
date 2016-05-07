/**
 * @file
 * Provides the selector function index.
 */

/**
 * Selects an individual from a population.
 *
 * @callback Selector
 *
 * @param {Array.<Program>} population
 * The population on which to run the selection.
 *
 * @returns {Program}
 * An individual from the pool.
 */

'use strict';

/**
 * @namespace selectors
 */

module.exports = {
  fittest: require('./fittest'),
  tournament: require('./tournament')
};
