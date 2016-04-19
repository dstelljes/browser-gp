/**
 * @file
 * Provides addition as a function.
 */

'use strict';

/**
 * Adds the two parameters.
 * @module functions/addition
 *
 * @param {number} a
 * @param {number} b
 *
 * @return {number}
 */
var addition = module.exports = function(a, b) {
  return a + b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @return {string}
 */
addition.toString = function() {
  return '+';
};
