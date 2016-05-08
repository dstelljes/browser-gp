/**
 * Contains the PRNG class.
 */

/**
 * Returns a random number in [0, 1).
 * @callback PRNG~source
 * @returns {number}
 */

'use strict';

/**
 * Constructs a PRNG instance.
 *
 * @param {PRNG~source} source
 * The source function.
 *
 * @class PRNG
 * @classdesc
 * Provides a standard set of utility functions around a pseudorandom number
 * generator.
 */
var PRNG = module.exports = function(source) {
  this.source = source;
};

/**
 * Returns a random double in the range [lower, upper).
 *
 * @param {number} [lower=0.0]
 * Lower bound of the desired range (inclusive).
 *
 * @param {number} [upper=1.0]
 * Upper bound of the desired range (exclusive).
 *
 * @returns {number}
 */
PRNG.prototype.double = function(lower, upper) {
  if (typeof lower === 'undefined') lower = 0;
  if (typeof upper === 'undefined') upper = 1;

  return this.source() * (upper - lower) + lower;
};

/**
 * Returns a random element from an array.
 *
 * @param {Array.<*>} array
 *
 * @returns {*}
 */
PRNG.prototype.from = function(array) {
  return array[this.integer(0, array.length)];
};

/**
 * Returns a random integer in the range [lower, upper).
 *
 * @param {number} [lower=0]
 * Lower bound of the desired range (inclusive).
 *
 * @param {number} upper
 * Upper bound of the desired range (exclusive).
 *
 * @returns {number}
 */
PRNG.prototype.integer = function(lower, upper) {
  if (typeof upper === 'undefined') {
    upper = lower;
    lower = 0;
  }

  return Math.floor(this.source() * (upper - lower)) + lower;
};

/**
 * Randomizes an array using the Fisher-Yates shuffle.
 *
 * @see http://stackoverflow.com/a/6274398
 *
 * @param {Array.<*>} array
 *
 * @returns {Array.<*>}
 */
PRNG.prototype.shuffle = function(array) {
  var pointer = array.length;

  while (pointer > 0) {
    // Pick a random index:
    var index = this.integer(pointer);

    // Decrement the pointer:
    pointer--;

    // Swap the last element:
    var element = array[pointer];
    array[pointer] = array[index];
    array[index] = element;
  }

  return array;
};
