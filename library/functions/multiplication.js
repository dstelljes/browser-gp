/**
 * @file
 * Provides multiplication as a function.
 */

'use strict';

/**
 * Multiplies the two parameters.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var multiplication = module.exports = function(a, b) {
  return a * b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
multiplication.toString = function() {
  return '*';
};
