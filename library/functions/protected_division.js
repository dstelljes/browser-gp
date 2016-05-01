/**
 * @file
 * Provides protected division as a function.
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
 * @return {number}
 */
var protectedDivision = module.exports = function(a, b) {
  // Returning 1 rather than 0 is a conscious choice as it seems to create more
  // interesting programs. Credit to Nic McPhee on this.
  return b === 0 ? 1 : a / b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @return {string}
 */
protectedDivision.toString = function() {
  return '%';
};
