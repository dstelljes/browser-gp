/**
 * @file
 * Provides logarithm with arbitrary base as a function.
 */

'use strict';

/**
 * Finds the logarithm of the first parameter with respect to the base of the
 * second parameter.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @return {number}
 */
var logarithm = module.exports = function(a, b) {
  return Math.log(a) / Math.log(b);
};

/**
 * Displays the operator symbol when stringified.
 *
 * @return {string}
 */
logarithm.toString = function() {
  return 'log';
};
