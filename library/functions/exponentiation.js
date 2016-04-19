/**
 * @file
 * Wraps native exponentiation so that it stringifies nicely.
 */

'use strict';

/**
 * Raises the first parameter to the second parameter power.
 * @module functions/exponentiation
 *
 * @param {number} a
 * @param {number} b
 *
 * @return {number}
 */
var exponentiation = module.exports = Math.pow;

/**
 * Displays the operator symbol when stringified.
 *
 * @return {string}
 */
exponentiation.toString = function() {
  return '^';
};
