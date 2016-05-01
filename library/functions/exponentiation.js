/**
 * @file
 * Wraps native exponentiation so that it stringifies nicely.
 */

'use strict';

/**
 * Raises the first parameter to the second parameter power.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var exponentiation = module.exports = Math.pow;

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
exponentiation.toString = function() {
  return '^';
};
