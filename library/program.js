/**
 * @file
 * Contains program utility functions.
 */

/**
 * @typedef {Array.<(function|number|string)>} Program
 * A program represented in prefix notation. Functions are functions, numbers
 * are constants, and strings are variables.
 */

'use strict';

/**
 * Evaluates a program with the specified values.
 *
 * This exploits a few convenient features of JavaScript, namely the `typeof`
 * operator and the fact that `.length` on a function will return its arity.
 *
 * @see https://en.wikipedia.org/wiki/Polish_notation
 *
 * @param {Program} program
 * A program representation.
 *
 * @param {Object.<string, number>} [values={}]
 * Variable substitutions keyed by name.
 *
 * @return {Promise<number>}
 * A promise that resolves with the result of the evaluation.
 */
var evaluate = module.exports.evaluate = function(program, values) {
  if (typeof values === 'undefined') values = {};

  return new Promise(function(resolve, reject) {
    var stack = [];

    cursor:
    for (var i = program.length - 1; i >= 0; i--) {
      var primitive = program[i];

      switch (typeof primitive) {
        case 'function':
          var operands = [];

          for (var j = 0; j < primitive.length; j++) {
            if (stack.length < 1) {
              reject(new Error('Not enough arguments for function at index ' + i));
              break cursor;
            }

            operands.push(stack.pop());
          }

          stack.push(primitive.apply(undefined, operands));

          break;

        case 'number':
          stack.push(primitive);
          break;

        case 'string':
          var value = values[primitive];

          if (typeof value === 'undefined') {
            reject(new Error('Unexpected variable ' + primitive + ' at index ' + i));
            break cursor;
          }

          stack.push(value);
          break;

        default:
          reject(new Error('Invalid primitive at index ' + i));
      }
    }

    resolve(stack.pop());
  });
};
