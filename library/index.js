/**
 * @file
 * Provides the entry point to the library.
 */

'use strict';

module.exports = {
  functions: require('./functions'),
  generators: require('./generators'),
  program: require('./program'),
  random: require('./random'),
  recombinators: require('./recombinators'),
  selectors: require('./selectors'),
  PRNG: require('./prng'),
  Problem: require('./problem'),
  scorers: require('./scorers')
};
