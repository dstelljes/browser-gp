/**
 * @file
 * Provides subtraction as a function.
 */

'use strict';

/**
 * Subtracts the second parameter from the first.
 * @module functions/subtraction
 *
 * @param {number} a
 * @param {number} b
 *
 * @return {number}
 */
var subtraction = module.exports = function(a, b) {
  return a - b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @return {string}
 */
subtraction.toString = function() {
  return '-';
};
