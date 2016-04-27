/**
 * @file
 * Provides the functions index.
 */

'use strict';

/**
 * @namespace functions
 */

module.exports = {
  // Numeric functions:
  addition: require('./addition'),
  division: require('./division'),
  exponentiation: require('./exponentiation'),
  logarithm: require('./logarithm'),
  multiplication: require('./multiplication'),
  sine: require('./sine'),
  subtraction: require('./subtraction'),

  // String functions:
  concatenation: require('./concatenation'),
  count: require('./count')
};
