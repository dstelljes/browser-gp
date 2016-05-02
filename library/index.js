/**
 * @file
 * Provides the entry point to the library.
 */

'use strict';

module.exports = {
  fitness: require('./fitness'),
  functions: require('./functions'),
  generators: require('./generators'),
  operators: require('./operators'),
  program: require('./program'),
  random: require('./random'),
  selection: require('./selection'),
  PRNG: require('./prng'),
  Problem: require('./problem')
};
