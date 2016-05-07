/**
 * @file
 * Contains the problem class.
 */

/**
 * Receives generational information from a run.
 *
 * @callback ResultsCallback
 *
 * @param {number} generation
 * The generation number.
 *
 * @param {Object.<string, number>} scores
 * Score information.
 * @param {number} scores.best
 * The score of the fittest individual in the population.
 *
 * @param {Object.<string, Program>} individuals
 * Notable individuals.
 * @param {number} individuals.best
 * The fittest individual in the population.
 *
 * @param {Array.<Program>} population
 * The population.
 */

/**
 * @typedef {Object} Case
 * A case that describes the desired output of an evolved program based on some
 * inputs.
 * @property {Object.<symbol, number>} inputs
 * Input values keyed by variable symbol.
 * @property {number} output
 * The expected output.
 */

'use strict';

var grow = require('./generators/grow');

var random = require('./random/native')();

var crossover = require('./recombinators/crossover');

var error = require('./scorers/error');

var fittest = require('./selectors/fittest');
var tournament = require('./selectors/tournament');

/**
 * Constructs a problem instance.
 *
 * @class Problem
 * @classdesc
 * Defines a symbolic regression problem. Uses a set of expressions to evolve a
 * model that matches a collection of inputs/outputs.
 */
var Problem = module.exports = function() {
  //
};

/**
 * Evolves a population.
 *
 * @param {Array.<Program>} population
 * The population to evolve.
 *
 * @returns {Array.<Program>}
 * The evolved population.
 */
Problem.prototype.evolve = function(population) {
  var recombinator = this.recombinator();
  var selector = this.selector();

  var evolved = [];

  for (var i = 0; i < population.length; i++) {
    var parents = [];

    for (var j = 0; j < recombinator.length; j++) {
      parents.push(selector(population));
    }

    var child = recombinator(...parents);
    evolved.push(child);

    // @TODO mutator
  }

  return evolved;
};

/**
 * Creates an initial population and runs evolution for the specified number of
 * generations.
 *
 * @param {ResultsCallback} [callback]
 * The result callback to receive generational information.
 */
Problem.prototype.run = function(callback) {
  // Create an initial population:
  var generator = this.generator();
  var population = [];

  for (var i = 0; i < this.populationSize; i++) {
    population.push(generator(this.depth));
  }

  // Use the boring selector to find the best individual:
  var scorer = this.scorer();
  var selector = fittest(scorer, this.maximize);

  for (var i = 0; i < this.generations; i++) {
    var bestIndividual = selector(population);
    var bestScore = scorer(bestIndividual);

    if (typeof callback === 'function') {
      callback(i, {
        best: bestScore
      }, {
        best: bestIndividual
      }, population);
    }

    // If an acceptable solution is found, we're done:
    if ((this.maximize && bestScore > this.acceptable) || bestScore < this.acceptable) {
      break;
    }

    // Otherwise, continue evolving:
    population = this.evolve(population);
  }
};

/**
 * The score at which a solution would be considered acceptable (i.e. when to
 * stop evolving).
 * @type {number}
 */
Problem.prototype.acceptable = 0.001;

/**
 * The test cases to score evolved programs against.
 * @type {Array.<Case>}
 */
Problem.prototype.cases = [];

/**
 * The constant set.
 * @type {Array.<boolean|number|string>}
 */
Problem.prototype.constants = [];

/**
 * The maximum depth a program can have. Defaults to 5.
 * @type number
 */
Problem.prototype.depth = 5;

/**
 * The function set.
 * @type {Array.<function>}
 */
Problem.prototype.functions = [];

/**
 * The number of generations to evolve. Defaults to 50.
 */
Problem.prototype.generations = 50;

/**
 * The generator factory. Provides a program generator at runtime. By default,
 * uses the grow generator at the specified maximum depth.
 */
Problem.prototype.generator = function() {
  return grow(this.functions, [].concat(this.constants, this.variables), this.random);
};

/**
 * Whether to maximize fitness. Minimizes by default.
 */
Problem.prototype.maximize = false;

/**
 * The population size. By default, 1000.
 * @type {number}
 */
Problem.prototype.populationSize = 1000;

/**
 * The random number generator. By default, Math.random.
 * @type {PRNG}
 */
Problem.prototype.random = random;

/**
 * The recombinator function factory. By default, does crossover with probability
 * 0.5.
 */
Problem.prototype.recombinator = function() {
  var random = this.random;
  var recombinator = crossover(random);

  return function(a, b) {
    return random.double() < 0.5 ? recombinator(a, b) : b;
  };
};

/**
 * The scorer factory. Provides a scorer at runtime. By default, creates an
 * error scorer on the supplied test cases.
 * @type {function}
 */
Problem.prototype.scorer = function() {
  return error(this.cases);
};

/**
 * The selection function factory. By default, creates a tournment with size 10.
 **/
Problem.prototype.selector = function() {
  return tournament(10, this.random, this.scorer());
};

/**
 * The variable set. Should match the variables needed by the test cases.
 * @type {Array.<symbol>}
 */
Problem.prototype.variables = [];
