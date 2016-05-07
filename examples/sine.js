/**
 * @file
 * Performs a symbolic regression on a sine function.
 */

'use strict';

var fs = require('fs'),
  gp = require('../library');

var cases = [];
var x = Symbol.for('x');

var contents = fs.readFileSync('./data/sine.txt', {
  encoding: 'utf8'
});

var lines = contents.split('\n');

for (var index in lines) {
  var line = lines[index];

  if (!line.length) {
    continue;
  }

  var components = line.split(' ');

  cases.push({
    inputs: {
      [x]: parseFloat(components[0])
    },
    output: parseFloat(components[1])
  });
}

var regression = new gp.Problem();

regression.cases = cases;

regression.constants = [];

regression.functions = [
  gp.functions.addition,
  gp.functions.subtraction,
  gp.functions.multiplication,
  gp.functions.protectedDivision
];

regression.variables = [x];

regression.run();
