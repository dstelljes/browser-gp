(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("library/functions/addition.js", function(exports, require, module) {
/**
 * @file
 * Provides addition as a function.
 */

'use strict';

/**
 * Adds the two parameters.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var addition = module.exports = function(a, b) {
  return a + b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
addition.toString = function() {
  return '+';
};

});

require.register("library/functions/concatenation.js", function(exports, require, module) {
/**
 * @file
 * Provides concatenation as a function.
 */

'use strict';

/**
 * Concatenates the two parameters.
 *
 * @function
 * @memberof functions
 *
 * @param {string} a
 * @param {string} b
 *
 * @returns {string}
 */
var concatenation = module.exports = function(a, b) {
  return a + b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
concatenation.toString = function() {
  return 'join';
};

});

require.register("library/functions/count.js", function(exports, require, module) {
/**
 * @file
 * Provides string length as a function.
 */

'use strict';

/**
 * Returns the length of the first parameter.
 *
 * @function
 * @memberof functions
 *
 * @param {string} a
 *
 * @returns {number}
 */
var count = module.exports = function(a) {
  return a.length;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
count.toString = function() {
  return 'count';
};

});

require.register("library/functions/division.js", function(exports, require, module) {
/**
 * @file
 * Provides division as a function.
 */

'use strict';

/**
 * Divides the first parameter by the second.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var division = module.exports = function(a, b) {
  return a / b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
division.toString = function() {
  return '/';
};

});

require.register("library/functions/exponentiation.js", function(exports, require, module) {
/**
 * @file
 * Wraps native exponentiation so that it stringifies nicely.
 */

'use strict';

/**
 * Raises the first parameter to the second parameter power.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var exponentiation = module.exports = Math.pow;

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
exponentiation.toString = function() {
  return '^';
};

});

require.register("library/functions/index.js", function(exports, require, module) {
/**
 * @file
 * Provides the functions index.
 */

'use strict';

/**
 * @namespace functions
 */

module.exports = {
  // Numeric functions:
  addition: require('./addition'),
  division: require('./division'),
  exponentiation: require('./exponentiation'),
  logarithm: require('./logarithm'),
  multiplication: require('./multiplication'),
  protectedDivision: require('./protected_division'),
  sine: require('./sine'),
  subtraction: require('./subtraction'),

  // String functions:
  concatenation: require('./concatenation'),
  count: require('./count')
};

});

require.register("library/functions/logarithm.js", function(exports, require, module) {
/**
 * @file
 * Provides logarithm with arbitrary base as a function.
 */

'use strict';

/**
 * Finds the logarithm of the first parameter with respect to the base of the
 * second parameter.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var logarithm = module.exports = function(a, b) {
  return Math.log(a) / Math.log(b);
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
logarithm.toString = function() {
  return 'log';
};

});

require.register("library/functions/multiplication.js", function(exports, require, module) {
/**
 * @file
 * Provides multiplication as a function.
 */

'use strict';

/**
 * Multiplies the two parameters.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var multiplication = module.exports = function(a, b) {
  return a * b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
multiplication.toString = function() {
  return '*';
};

});

require.register("library/functions/protected_division.js", function(exports, require, module) {
/**
 * @file
 * Provides protected division as a function.
 */

'use strict';

/**
 * Divides the first parameter by the second.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var protectedDivision = module.exports = function(a, b) {
  // Returning 1 rather than 0 is a conscious choice as it seems to create more
  // interesting programs. Credit to Nic McPhee on this.
  return b === 0 ? 1 : a / b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
protectedDivision.toString = function() {
  return '%';
};

});

require.register("library/functions/sine.js", function(exports, require, module) {
/**
 * @file
 * Wraps the native sine function so that it stringifies nicely.
 */

'use strict';

/**
 * Takes the sine of the first parameter.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 *
 * @returns {number}
 */
var sine = module.exports = Math.sin;

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
sine.toString = function() {
  return 'sin';
};

});

require.register("library/functions/subtraction.js", function(exports, require, module) {
/**
 * @file
 * Provides subtraction as a function.
 */

'use strict';

/**
 * Subtracts the second parameter from the first.
 *
 * @function
 * @memberof functions
 *
 * @param {number} a
 * @param {number} b
 *
 * @returns {number}
 */
var subtraction = module.exports = function(a, b) {
  return a - b;
};

/**
 * Displays the operator symbol when stringified.
 *
 * @returns {string}
 */
subtraction.toString = function() {
  return '-';
};

});

require.register("library/generators/full.js", function(exports, require, module) {
/**
 * @file
 * Implements the full generator.
 */

'use strict';

/**
 * Creates a function that builds a full program tree of the maximum depth is
 * reached (as opposed to the grow generator, which may not reach the maximum
 * depth or result in a full tree).
 *
 * @function
 * @memberof generators
 *
 * @param {Array.<function>} functions
 * The function set.
 *
 * @param {Array.<number|string|symbol>} terminals
 * The terminal set.
 *
 * @param {PRNG} random
 * The random number generator to use when selecting from the function and
 * terminal sets.
 *
 * @returns {Generator}
 */
var full = module.exports = function(functions, terminals, random) {
  var recurse = function(depth) {
    var tree = [];

    if (depth === 0) {
      tree.push(random.from(terminals));
    }
    else {
      var fn = random.from(functions);
      tree.push(fn);

      for (var i = 0; i < fn.length; i++) {
        tree.push(...recurse(depth - 1));
      }
    }

    return tree;
  };

  return recurse;
};

});

require.register("library/generators/grow.js", function(exports, require, module) {
/**
 * @file
 * Implements the grow generator.
 */

'use strict';

/**
 * Creates a function that generates a program by picking randomly from the
 * function and terminal sets until a maximum depth is reached.
 *
 * @function
 * @memberof generators
 *
 * @param {Array.<function>} functions
 * The function set.
 *
 * @param {Array.<number|string|symbol>} terminals
 * The terminal set.
 *
 * @param {PRNG} random
 * The random number generator to use when selecting from the function and
 * terminal sets.
 *
 * @returns {Generator}
 */
var grow = module.exports = function(functions, terminals, random) {
  var p = terminals.length / (functions.length + terminals.length);

  var recurse = function(depth) {
    var tree = [];

    if (depth === 0 || random.double() < p) {
      tree.push(random.from(terminals));
    }
    else {
      var fn = random.from(functions);
      tree.push(fn);

      for (var i = 0; i < fn.length; i++) {
        tree.push(...recurse(depth - 1));
      }
    }

    return tree;
  };

  return recurse;
};

});

require.register("library/generators/index.js", function(exports, require, module) {
/**
 * @file
 * Provides the generators index.
 */

/**
 * Generates a program up to the maximum specified depth.
 *
 * @callback Generator
 *
 * @param {number} depth
 * The maximum depth that a generated tree should have (specifically, the depth
 * of the deepest leaf assuming the root is depth 0).
 *
 * @returns {Program}
 *
 * @see http://cswww.essex.ac.uk/staff/rpoli/gp-field-guide/22InitialisingthePopulation.html#7_2
 */

'use strict';

/**
 * @namespace generators
 */

module.exports = {
  full: require('./full'),
  grow: require('./grow')
};

});

require.register("library/index.js", function(exports, require, module) {
/**
 * @file
 * Provides the entry point to the library.
 */

'use strict';

module.exports = {
  functions: require('./functions'),
  generators: require('./generators'),
  mutators: require('./mutators'),
  program: require('./program'),
  random: require('./random'),
  recombinators: require('./recombinators'),
  scorers: require('./scorers'),
  selectors: require('./selectors'),
  PRNG: require('./prng'),
  Problem: require('./problem')
};

});

require.register("library/mutators/index.js", function(exports, require, module) {
/**
 * @file
 * Provides the mutator function index.
 */

/**
 * Creates a new program based on one or more programs.
 *
 * @callback Recombinator
 *
 * @param {...Program} program
 *
 * @returns {Program}
 */

'use strict';

/**
 * @namespace mutators
 */

module.exports = {
  point: require('./point')
};

});

require.register("library/mutators/point.js", function(exports, require, module) {
/**
 * @file
 * Provides point mutation.
 */

'use strict';

/**
 * Creates a point mutation operator.
 *
 * @function
 * @memberof mutators
 *
 * @param {Array} primitives
 * An array of possible primitives to substitute.
 *
 * @param {number} probability
 * The per-node probability that a mutation will take place.
 *
 * @param {PRNG} random
 * The random number generator to use for selecting crossover points.
 *
 * @returns {Mutator}
 */
var point = module.exports = function(primitives, probability, random) {
  var match = function(primitive) {
    // To ensure that all primitives have a chance to be selected, shuffle:
    random.shuffle(primitives);

    for (var i = 0; i < primitives.length; i++) {
      // Make sure types match:
      // @TODO: what about symbols?
      if (typeof primitive !== typeof primitives[i]) {
        continue;
      }

      // Make sure arities match:
      if (typeof primitive === 'function' && primitive.length !== primitives[i].length) {
        continue;
      }

      return primitives[i];
    }
  };

  return function(parent) {
    // Quick and easy way to clone an array:
    // @see https://davidwalsh.name/javascript-clone-array
    var child = parent.slice(0);

    for (var i = 0; i < parent.length; i++) {
      if (random.double() > probability) {
        continue;
      }

      var substitute = match(parent[i]);

      // Only do the mutation if there's something that will reasonably fit:
      if (!substitute) {
        continue;
      }

      child[i] = substitute;
    }

    return child;
  };
};

});

require.register("library/prng.js", function(exports, require, module) {
/**
 * Contains the PRNG class.
 */

/**
 * Returns a random number in [0, 1).
 * @callback PRNG~source
 * @returns {number}
 */

'use strict';

/**
 * Constructs a PRNG instance.
 *
 * @param {PRNG~source} source
 * The source function.
 *
 * @class PRNG
 * @classdesc
 * Provides a standard set of utility functions around a pseudorandom number
 * generator.
 */
var PRNG = module.exports = function(source) {
  this.source = source;
};

/**
 * Returns a random double in the range [lower, upper).
 *
 * @param {number} [lower=0.0]
 * Lower bound of the desired range (inclusive).
 *
 * @param {number} [upper=1.0]
 * Upper bound of the desired range (exclusive).
 *
 * @returns {number}
 */
PRNG.prototype.double = function(lower, upper) {
  if (typeof lower === 'undefined') lower = 0;
  if (typeof upper === 'undefined') upper = 1;

  return this.source() * (upper - lower) + lower;
};

/**
 * Returns a random element from an array.
 *
 * @param {Array.<*>} array
 *
 * @returns {*}
 */
PRNG.prototype.from = function(array) {
  return array[this.integer(0, array.length)];
};

/**
 * Returns a random integer in the range [lower, upper).
 *
 * @param {number} [lower=0]
 * Lower bound of the desired range (inclusive).
 *
 * @param {number} upper
 * Upper bound of the desired range (exclusive).
 *
 * @returns {number}
 */
PRNG.prototype.integer = function(lower, upper) {
  if (typeof upper === 'undefined') {
    upper = lower;
    lower = 0;
  }

  return Math.floor(this.source() * (upper - lower)) + lower;
};

/**
 * Randomizes an array using the Fisher-Yates shuffle.
 *
 * @see http://stackoverflow.com/a/6274398
 *
 * @param {Array.<*>} array
 *
 * @returns {Array.<*>}
 */
PRNG.prototype.shuffle = function(array) {
  var pointer = array.length;

  while (pointer > 0) {
    // Pick a random index:
    var index = this.integer(pointer);

    // Decrement the pointer:
    pointer--;

    // Swap the last element:
    var element = array[pointer];
    array[pointer] = array[index];
    array[index] = element;
  }

  return array;
};

});

require.register("library/problem.js", function(exports, require, module) {
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

var point = require('./mutators/point');

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
  var mutator = this.mutator();
  var recombinator = this.recombinator();
  var selector = this.selector();

  var evolved = [];

  for (var i = 0; i < population.length; i++) {
    var parents = [];

    for (var j = 0; j < recombinator.length; j++) {
      parents.push(selector(population));
    }

    var child = mutator(recombinator(...parents));
    evolved.push(child);
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
 * The mutator function factory. By default, does point mutation with probability
 * 0.25 (per-node probability 0.05).
 */
Problem.prototype.mutator = function() {
  var random = this.random;

  var primitives = [].concat(this.constants, this.functions, this.variables);
  var mutator = point(primitives, 0.05, random);

  return function(program) {
    return random.double() < 0.25 ? mutator(program) : program;
  };
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
 * The recombinator function factory. By default, does crossover with probability
 * 0.75.
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

});

require.register("library/program.js", function(exports, require, module) {
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

});

require.register("library/random/index.js", function(exports, require, module) {
/**
 * @file
 * Provides the random number generators index.
 */

'use strict';

/**
 * @namespace random
 */

module.exports = {
  native: require('./native'),
  wheel: require('./wheel')
};

});

require.register("library/random/native.js", function(exports, require, module) {
/**
 * @file
 * Provides a Math.random wrapper.
 */

'use strict';

var PRNG = require('../prng');

/**
 * Wraps the native Math.random function in a PRNG instance. Math.random is not
 * cryptographically secure, can't be seeded, and varies from implementation to
 * implementation.
 *
 * @function
 * @memberof random
 *
 * @returns {PRNG}
 * A PRNG instance.
 *
 * @see http://v8project.blogspot.com/2015/12/theres-mathrandom-and-then-theres.html
 */
var native = module.exports = function() {
  return new PRNG(Math.random);
};

});

require.register("library/random/wheel.js", function(exports, require, module) {
/**
 * @file
 * Provides a stupid random number service.
 */

'use strict';

var PRNG = require('../prng');

/**
 * Simulates a random number generator by cycling through a provided array of
 * values. Useful for testing behavior of stochastic functions.
 *
 * @function
 * @memberof random
 *
 * @param {number} values
 * The values in [0, 1) to cycle through.
 *
 * @returns {PRNG}
 * A PRNG instance.
 */
var wheel = module.exports = function(values) {
  var length = values.length;
  var position = 0;

  return new PRNG(function() {
    return values[position++ % length];
  });
};

});

require.register("library/recombinators/crossover.js", function(exports, require, module) {
/**
 * @file
 * Provides the crossover operator.
 */

'use strict';

var program = require('../program');

/**
 * Creates a crossover operator.
 *
 * @function
 * @memberof recombinators
 *
 * @param {PRNG} random
 * The random number generator to use for selecting crossover points.
 *
 * @returns {Recombinator}
 */
var crossover = module.exports = function(random) {
  return function(a, b) {
    // Get crossover points:
    var ax = random.integer(0, a.length);
    var bx = random.integer(0, b.length);

    // Quick and easy way to clone an array:
    // @see https://davidwalsh.name/javascript-clone-array
    var child = a.slice(0);

    // Get the replacement subtree from b:
    var subtree = program.extractSubtree(b, bx);

    // Remove the old subtree and insert the replacement:
    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
    child.splice(ax, program.findSubtreeLength(a, ax), ...subtree);

    return child;
  };
};

});

require.register("library/recombinators/index.js", function(exports, require, module) {
/**
 * @file
 * Provides the recombinator function index.
 */

/**
 * Creates a new program based on one or more programs.
 *
 * @callback Recombinator
 *
 * @param {...Program} program
 *
 * @returns {Program}
 */

'use strict';

/**
 * @namespace recombinators
 */

module.exports = {
  crossover: require('./crossover')
};

});

require.register("library/scorers/error.js", function(exports, require, module) {
/**
 * @file
 * Provides the standard |actual - expected| fitness measure.
 */

'use strict';

var evaluate = require('../program').evaluate;

/**
 * Calculates the error of a program on a target case.
 *
 * @function
 * @private
 *
 * @param {Program} program
 * A program respresentation.
 *
 * @param {Case} test
 * The fitness case to evaluate. (`case` is a reserved word.)
 *
 * @returns {number}
 * The difference between the actual value and the expected value.
 */
var difference = function(program, test) {
  return Math.abs(evaluate(program, test.inputs) - test.output);
};

/**
 * Creates a scorer that returns the fitness of a program as the sum of test
 * case errors.
 *
 * @function
 * @memberof scorers
 *
 * @param {Array.<Case>} tests
 * The fitness cases to evaluate.
 *
 * @returns {Scorer}
 */
var error = module.exports = function(tests) {
  return function(program) {
    var sum = 0;

    for (var index in tests) {
      sum += difference(program, tests[index]);
    }

    return sum;
  };
};

});

require.register("library/scorers/index.js", function(exports, require, module) {
/**
 * @file
 * Provides the fitness evaluations index.
 */

/**
 * Calculates the fitness of a program.
 *
 * @callback Scorer
 *
 * @param {Program} program
 * A program respresentation.
 *
 * @returns {number}
 * The fitness of the program.
 */

'use strict';

/**
 * @namespace scorers
 */

module.exports = {
  error: require('./error')
};

});

require.register("library/selectors/fittest.js", function(exports, require, module) {
/**
 * @file
 * Provides fittest individual selection.
 */

'use strict';

/**
 * Creates a selection function that picks the fittest individual from the
 * entire population.
 *
 * @function
 * @memberof selectors
 *
 * @param {Scorer} scorer
 * The fitness function to use for scoring.
 *
 * @param {boolean} [maximize=false]
 * Whether higher fitness scores are considered better than lower fitness scores.
 *
 * @return {Selector}
 */
var fittest = module.exports = function(scorer, maximize) {
  return function(population) {
    var scores = population.map(function(individual, index) {
      return {
        index: index,
        score: scorer(individual)
      };
    }).sort(function(a, b) {
      return +(a.score > b.score) || +(a.score === b.score) - 1;
    });

    var best = maximize ? scores.length - 1 : 0;
    return population[scores[best].index];
  };
};

});

require.register("library/selectors/index.js", function(exports, require, module) {
/**
 * @file
 * Provides the selector function index.
 */

/**
 * Selects an individual from a population.
 *
 * @callback Selector
 *
 * @param {Array.<Program>} population
 * The population on which to run the selection.
 *
 * @returns {Program}
 * An individual from the pool.
 */

'use strict';

/**
 * @namespace selectors
 */

module.exports = {
  fittest: require('./fittest'),
  tournament: require('./tournament')
};

});

require.register("library/selectors/tournament.js", function(exports, require, module) {
/**
 * @file
 * Provides tournament selection.
 */

'use strict';

/**
 * Creates a selection function that picks the fittest individual from a random
 * sample of the population.
 *
 * @function
 * @memberof selectors
 *
 * @param {number} size
 * The tournament size (i.e. the number of random individuals that will compete
 * to be the parent).
 *
 * @param {PRNG} random
 * The random number generator to use when selecting the individuals in the
 * tournament.
 *
 * @param {Scorer} scorer
 * The fitness function to use for scoring.
 *
 * @param {boolean} [maximize=false]
 * Whether higher fitness scores are considered better than lower fitness scores.
 *
 * @return {Selector}
 */
var tournament = module.exports = function(size, random, scorer, maximize) {
  return function(population) {
    var sample = [];

    for (var i = 0; i < size; i++) {
      sample.push(random.from(population));
    }

    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

    var scores = sample.map(function(individual, index) {
      return {
        index: index,
        score: scorer(individual)
      };
    }).sort(function(a, b) {
      return +(a.score > b.score) || +(a.score === b.score) - 1;
    });

    var best = maximize ? scores.length - 1 : 0;
    return sample[scores[best].index];
  };
};

});

require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.gp = require("./library");


});})();require('___globals___');

