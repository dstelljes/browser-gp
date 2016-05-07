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

regression.constants = [-1, 2, 5];

regression.variables = [x];

regression.functions = [
  gp.functions.sine
];

console.log('Trying to evolve sin(x) with the sine function provided... usually succeeds immediately:\n');

regression.run(function(generation, scores, individuals) {
  console.log('Generation %d:', generation);
  console.log('  Best score: %d', scores.best);
  console.log('  Best individual: %s', gp.program.lispify(individuals.best));
});

regression.functions = [
  gp.functions.addition,
  gp.functions.subtraction,
  gp.functions.multiplication,
  gp.functions.protectedDivision
];

console.log('\n\nTrying to find an approximation for sin(x) with simple operations:\n');

regression.run(function(generation, scores, individuals) {
  console.log('Generation %d:', generation);
  console.log('  Best score: %d', scores.best);
  console.log('  Best individual: %s', gp.program.lispify(individuals.best));
});
