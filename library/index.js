/**
 * @file
 * Provides the entry point to the library.
 */

'use strict';

module.exports = {
  functions: require('./functions'),
  generators: require('./generators'),
  mutators: require('./mutators'),
  program: require('./program'),
  random: require('./random'),
  recombinators: require('./recombinators'),
  scorers: require('./scorers'),
  selectors: require('./selectors'),
  PRNG: require('./prng'),
  Problem: require('./problem')
};
