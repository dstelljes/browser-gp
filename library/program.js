/**
 * @file
 * Contains program utility functions.
 */

/**
 * @typedef {Array.<(function|number|string)>} Program
 * A program represented in prefix notation. Functions are functions, numbers
 * are constants, and strings are variables.
 */

/**
 * @module program
 */

'use strict';

/**
 * Evaluates a program with the specified values.
 *
 * @function
 *
 * @see https://en.wikipedia.org/wiki/Polish_notation
 *
 * @param {Program} program
 * A program representation.
 *
 * @param {Object.<string, number>} [values={}]
 * Variable substitutions keyed by name.
 *
 * @return {number}
 * The result of the evaluation.
 */
var evaluate = module.exports.evaluate = function(program, values) {
  if (typeof values === 'undefined') values = {};

  var stack = [];

  for (var i = program.length - 1; i >= 0; i--) {
    var primitive = program[i];

    switch (typeof primitive) {
      case 'function':
        var operands = [];

        for (var j = 0; j < primitive.length; j++) {
          if (stack.length < 1) {
            throw new Error('Not enough arguments for function at index ' + i);
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
          throw new Error('Unexpected variable ' + primitive + ' at index ' + i);
        }

        stack.push(value);
        break;

      default:
        throw new Error('Invalid primitive at index ' + i);
    }
  }

  return stack.pop();
};

/**
 * Returns the program subtree rooted at a given point.
 *
 * @function
 *
 * @param {Program} program
 * A program representation.
 *
 * @param {number} root
 * The index of the root node.
 *
 * @return {Program}
 * The resulting program subtree.
 */
var subtree = module.exports.subtree = function(program, root) {
  var counter = 1, pointer = root, tree = [];

  while (counter > 0) {
    if (pointer >= program.length) {
      throw new Error('Invalid program');
    }

    var primitive = program[pointer];
    tree.push(primitive);

    if (typeof primitive === 'function') {
      counter += primitive.length;
    }

    counter--;
    pointer++;
  }

  return tree;
};
