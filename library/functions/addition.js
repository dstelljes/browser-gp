/**
 * @file
 * Provides addition as a function.
 */

'use strict';

/**
 * Adds the two parameters.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var addition = module.exports = function(a, b) {
  return a + b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
addition.toString = function() {
  return '+';
};
