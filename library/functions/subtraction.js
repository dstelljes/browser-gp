/**
 * @file
 * Provides subtraction as a function.
 */

'use strict';

/**
 * Subtracts the second parameter from the first.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var subtraction = module.exports = function(a, b) {
  return a - b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
subtraction.toString = function() {
  return '-';
};
