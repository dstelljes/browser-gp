/**
 * @file
 * Contains program utility functions.
 */

/**
 * @typedef {Array.<(boolean|function|number|string|symbol)>} Program
 * A program represented in prefix notation. Functions are functions; booleans,
 * numbers, and strings are constants; symbols are variables.
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
 * @param {Object.<symbol, boolean|number|string>} [values={}]
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

/**
 * Converts a program representation to an s-expression.
 *
 * @param {Program} program
 * The program to stringify.
 *
 * @returns {string}
 * The program as an s-expression.
 */
var lispify = module.exports.lispify = function(program) {
  var pointer = 0;
  var expression = [];

  while (pointer < program.length) {
    var primitive = program[pointer];

    switch (typeof primitive) {
      case 'function':
        var subtree = extractSubtree(program, pointer);
        subtree.shift();

        expression.push('(' + primitive, lispify(subtree) + ')');
        pointer += findSubtreeLength(program, pointer);

        break;

      case 'boolean':
      case 'number':
        expression.push(primitive);
        pointer += 1;

        break;

      case 'string':
        expression.push('"' + primitive + '"');
        pointer += 1;

        break;

      case 'symbol':
        expression.push(Symbol.keyFor(primitive) || '<variable>');
        pointer += 1;

        break;

      default:
        throw new Error('Invalid primitive at index ' + pointer);
    }
  }

  return expression.join(' ');
};

/**
 * Converts a program representation to a nested structure.
 *
 * @param {Program} program
 * The program to treeify.
 *
 * @returns {Array}
 * The nested program.
 */
var treeify = module.exports.treeify = function(program) {
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

        stack.push([primitive.toString(), ...operands]);
        break;

      case 'boolean':
      case 'number':
      case 'string':
        stack.push(primitive);
        break;

      case 'symbol':
        stack.push(Symbol.keyFor(primitive) || '<variable>');
        break;

      default:
        throw new Error('Invalid primitive at index ' + i);
    }
  }

  return stack.pop();
};
