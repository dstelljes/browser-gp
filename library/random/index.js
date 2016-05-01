/**
 * @file
 * Provides the random number generators index.
 */

'use strict';

/**
 * @namespace random
 */

module.exports = {
  native: require('./native'),
  wheel: require('./wheel')
};
