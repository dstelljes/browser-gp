// Import the library. The require wrapper expects a global scope to work with,
// so we give it the worker.
// @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
var window = this;
importScripts('../js/gp.js');

var run = function(problem, run) {
  var runner = new gp.Problem();

  // Copy the easy properties:
  runner.depth = run.depth;
  runner.generations = run.generations;
  runner.maximize = problem.maximize;

  // Set constants:
  runner.constants = run.constants;

  // Set functions:
  run.functions.forEach(function(fn) {
    if (fn.bundled) {
      runner.functions.push(gp.functions[fn.key]);
    }
    else {
      // @TODO write eval stuff
    }
  });

  // Set variables:
  problem.variables.forEach(function(variable) {
    // Symbol.for is cool in this context because the worker is isolated.
    runner.variables.push(Symbol.for(variable));
  });

  // Replace variables with their symbolic equivalents:
  problem.tests.forEach(function(test) {
    var inputs = {};
    var output = test.output;

    for (var i = 0; i < test.inputs.length; i++) {
      // This looks weird, but it's taking advantage of the variable orders the
      // same way that the controller does.
      inputs[runner.variables[i]] = test.inputs[i];
    }

    runner.cases.push({
      inputs: inputs,
      output: output
    });
  });

  // @TODO handle mutators and recombinators and all that... possibly generalize
  // the thing that evals functions

  window.postMessage({
    event: 'started'
  });

  console.log(runner);

  runner.run(function(generation, scores, individuals) {
    window.postMessage({
      event: 'evolved',
      generation: generation,
      best: scores.best
    });
  });

  window.postMessage({
    event: 'finished'
  });
};

window.onmessage = function(message) {
  switch (message.data.action) {
    case 'run':
      run(message.data.problem, message.data.run);
      break;

    default:
      throw new Error('Invalid action :(');
  }
};
