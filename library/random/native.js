/**
 * @file
 * Provides a Math.random wrapper.
 */

'use strict';

var PRNG = require('../prng');

/**
 * Wraps the native Math.random function in a PRNG instance. Math.random is not
 * cryptographically secure, can't be seeded, and varies from implementation to
 * implementation.
 *
 * @function
 * @memberof random
 *
 * @returns {PRNG}
 * A PRNG instance.
 *
 * @see http://v8project.blogspot.com/2015/12/theres-mathrandom-and-then-theres.html
 */
var native = module.exports = function() {
  return new PRNG(Math.random);
};
