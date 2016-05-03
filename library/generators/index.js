/**
 * @file
 * Provides the generators index.
 */

/**
 * Generates a program up to the maximum specified depth.
 *
 * @callback Generator
 *
 * @param {number} depth
 * The maximum depth that a generated tree should have (specifically, the depth
 * of the deepest leaf assuming the root is depth 0).
 *
 * @returns {Program}
 *
 * @see http://cswww.essex.ac.uk/staff/rpoli/gp-field-guide/22InitialisingthePopulation.html#7_2
 */

'use strict';

/**
 * @namespace generators
 */

module.exports = {
  full: require('./full'),
  grow: require('./grow')
};
