/**
 * @file
 * Provides the recombinator function index.
 */

/**
 * Creates a new program based on one or more programs.
 *
 * @callback Recombinator
 *
 * @param {...Program} program
 *
 * @returns {Program}
 */

'use strict';

/**
 * @namespace recombinators
 */

module.exports = {
  crossover: require('./crossover')
};