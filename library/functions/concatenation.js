/**
 * @file
 * Provides concatenation as a function.
 */

'use strict';

/**
 * Concatenates the two parameters.
 *
 * @function
 * @memberof functions
 *
 * @param {string} a
 * @param {string} b
 *
 * @return {string}
 */
var concatenation = module.exports = function(a, b) {
  return a + b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @return {string}
 */
concatenation.toString = function() {
  return 'join';
};
