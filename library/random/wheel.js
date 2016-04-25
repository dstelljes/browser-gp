/**
 * @file
 * Provides a stupid random number service.
 */

'use strict';

var PRNG = require('../prng');

/**
 * Simulates a random number generator by cycling through a provided array of
 * values. Useful for testing behavior of stochastic functions.
 *
 * @function
 * @memberof random
 *
 * @param {number} values
 * The values in [0, 1) to cycle through.
 *
 * @returns {PRNG}
 * A PRNG instance.
 */
var wheel = module.exports = function(values) {
  var length = values.length;
  var position = 0;

  return new PRNG(function() {
    return values[position++ % length];
  });
};
