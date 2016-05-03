/**
 * @file
 * Contains program utility functions.
 */

/**
 * @typedef {Array.<(function|number|string|symbol)>} Program
 * A program represented in prefix notation. Functions are functions, numbers
 * and strings are constants, and symbols are variables.
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
 * @param {Object.<symbol, number>} [values={}]
 * Variable substitutions keyed by name.
 *
 * @returns {number}
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

      case 'boolean':
      case 'number':
      case 'string':
        stack.push(primitive);
        break;

      case 'symbol':
        var value = values[primitive];

        if (typeof value === 'undefined') {
          throw new Error('Unexpected variable at index ' + i);
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
 * @returns {Program}
 * The resulting program subtree.
 */
var extractSubtree = module.exports.extractSubtree = function(program, root) {
  var tree = [];

  for (var i = root; i < root + findSubtreeLength(program, root); i++) {
    tree.push(program[i]);
  }

  return tree;
};

/**
 * Finds the length of a subtree rooted at a given point.
 *
 * @function
 *
 * @param {Program} program
 * A program representation.
 *
 * @param {number} root
 * The index of the root node.
 *
 * @returns {number}
 * The length of the subtree.
 */
var findSubtreeLength = module.exports.findSubtreeLength = function(program, root) {
  var counter = 1, pointer = root;

  while (counter > 0) {
    if (pointer >= program.length) {
      throw new Error('Invalid program');
    }

    var primitive = program[pointer];

    if (typeof primitive === 'function') {
      counter += primitive.length; //returns the number of args that the primitve takes
    }

    counter--;
    pointer++;
  }

  return pointer - root;
};
