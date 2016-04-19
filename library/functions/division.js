/**
 * @file
 * Provides division as a function.
 */

'use strict';

/**
 * Divides the first parameter by the second.
 * @module functions/division
 *
 * @param {number} a
 * @param {number} b
 *
 * @return {number}
 */
var division = module.exports = function(a, b) {
  return a / b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @return {string}
 */
division.toString = function() {
  return '/';
};
