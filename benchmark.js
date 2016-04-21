/**
 * @file
 * Just for kicks, benchmarks GP program execution.
 */

'use strict';

var gp = require('./library'),
  add = gp.functions.addition;

var start, end, iterations = 1000000, x = 12, y = Math.PI / 2;

var native = function(x, y) {
  return Math.pow(x, 2) + Math.cos(y);
};

// (+ (^ x 2) (cos y))
var tree = [add, Math.pow, 'x', 2, Math.cos, 'y'];

console.log('%d iterations', iterations);

start = process.hrtime();

for (var i = 0; i < iterations; i++) {
  native(x, y);
}

end = process.hrtime(start);
console.log('Native: %dms', end[1] / 1000000);

start = process.hrtime();

for (var i = 0; i < iterations; i++) {
  gp.program.evaluate(tree, {
    x: x,
    y: y
  });
}

end = process.hrtime(start);
console.log('GP: %dms', end[1] / 1000000);
