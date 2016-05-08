/**
 * @file
 * Tests fittest individual selection.
 */

'use strict';

var gp = require('../../../library');

describe('tournament selection', function() {
  var population = ['a', 'bb', 'ccc', 'dddd', 'eeeee', 'ffffff'];
  var scorer = function(individual) {
    return individual.length;
  };

  it('maximizes fitness', function() {
    var fittest = gp.selectors.fittest(scorer, true);
    expect(fittest(population)).toBe('ffffff');
  });

  it('minimizes fitness', function() {
    var fittest = gp.selectors.fittest(scorer);
    expect(fittest(population)).toBe('a');
  });
});
