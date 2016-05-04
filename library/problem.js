/**
 * @file
 * Contains the problem class.
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

// Default generator:
var grow = require('./generators/grow');

// Default PRNG instance:
var random = require('./random/native')();

// Default scorer:
var error = require('./fitness/error');

// Default selector:
var tournament = require('./selection/tournament');

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

Problem.prototype.run = function() {
  //create inital population
  var generator = this.generator();
  var population = [];

  for (var i = 0; i < this.populationSize; i++) {
    population.push(generator(this.depth));
  }

  console.log(population);

  // build a new generation using selection method (tournament)
  var selection = this.selection();
  var parents =[];
  for (var i = 0; i < this.populationSize; i++) {
    parents.push(selection(population));

    /*Rough plan after talking to Nic*/
    //select p1 and p2
    //xo these parents
    //mutate the new child with some probability
    //repeat until full population is generated
  }

  // mutation



};

/**
 * The test cases to score evolved programs against.
 * @type {Array.<Case>}
 */
Problem.prototype.cases = [];

/**
 * The constant set.
 * @type {Array.<boolean|number|string>}
 */
Problem.prototype.constants = [-2, 0, 2];

/**
 * The maximum depth a program can have.
 * @type number
 */
Problem.prototype.depth = 5;

/**
 * The function set.
 * @type {Array.<function>}
 */
Problem.prototype.functions = [Math.sin, Math.cos];

/**
 * The generator factory. Provides a program generator at runtime. By default,
 * uses the grow generator at the specified maximum depth.
 */
Problem.prototype.generator = function() {
  return grow(this.functions, [].concat(this.constants, this.variables), this.random);
};

/**
 * The operator function factory. By default, does crossover with probability
 * 0.5.
 */
Problem.prototype.operation = function() {
  return
};

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
 * The scorer factory. Provides a scorer at runtime. By default, creates an
 * error scorer on the supplied test cases.
 * @type {function}
 */
Problem.prototype.scorer = function() {
  return error(this.cases);
};

/**
 * The selection function factory
 * By default tournments size is 5
 **/
Problem.prototype.selection = function(){
  return tournament(5, this.random, this.scorer());
};

/**
 * The variable set. Should match the variables needed by the test cases.
 * @type {Array.<symbol>}
 */
Problem.prototype.variables = [];
