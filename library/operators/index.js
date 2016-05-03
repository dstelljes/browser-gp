/**
 * @file
 * Provides the operators index.
 */

/**
 * Creates a new program based on one or more programs.
 *
 * @callback Operator
 *
 * @param {...Program} program
 *
 * @returns {Program}
 */

'use strict';

/**
 * @namespace operators
 */

module.exports = {
  crossover: require('./crossover')
};
