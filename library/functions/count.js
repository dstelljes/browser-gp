/**
 * @file
 * Provides string length as a function.
 */

'use strict';

/**
 * Returns the length of the first parameter.
 *
 * @function
 * @memberof functions
 *
 * @param {string} a
 *
 * @return {number}
 */
var count = module.exports = function(a) {
  return a.length;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @return {string}
 */
count.toString = function() {
  return 'count';
};
