/**
 * @file
 * Tests tournament selection.
 */

'use strict';

var gp = require('../../../library');

describe('tournament selection', function() {
  var population = ['a', 'bb', 'ccc', 'dddd', 'eeeee', 'ffffff'];
  var wheel = gp.random.wheel([0, 0.4, 0.8]);
  var scorer = function(individual) {
    return individual.length;
  };

  it('maximizes fitness', function() {
    var tournament = gp.selectors.tournament(3, wheel, scorer, true);
    expect(tournament(population)).toBe('eeeee');
  });

  it('minimizes fitness', function() {
    var tournament = gp.selectors.tournament(3, wheel, scorer);
    expect(tournament(population)).toBe('a');
  });
});
