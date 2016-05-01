/**
 * @file
 * Wraps the native sine function so that it stringifies nicely.
 */

'use strict';

/**
 * Takes the sine of the first parameter.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 *
 * @returns {number}
 */
var sine = module.exports = Math.sin;

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
sine.toString = function() {
  return 'sin';
};
