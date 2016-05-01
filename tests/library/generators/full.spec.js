/**
 * @file
 * Tests the full generator.
 */

'use strict';

var gp = require('../../../library');

describe('the full generator', function() {
  it('generates a single-terminal program when depth is 0', function() {
    var random = gp.random.wheel([0]);
    var grow = gp.generators.full([Math.sin, Math.cos], [Math.PI, 0], random);

    expect(grow(0)).toEqual([Math.PI]);
  });

  it('generates a program of the correct depth', function() {
    var random = gp.random.wheel([0.75]);
    var grow = gp.generators.full([Math.sin, Math.cos], [Math.PI, 0], random);

    expect(grow(1)).toEqual([Math.cos, 0]);
    expect(grow(3)).toEqual([Math.cos, Math.cos, Math.cos, 0]);
  });
});
