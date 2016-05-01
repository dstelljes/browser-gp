/**
 * @file
 * Provides division as a function.
 */

'use strict';

/**
 * Divides the first parameter by the second.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var division = module.exports = function(a, b) {
  return a / b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
division.toString = function() {
  return '/';
};
