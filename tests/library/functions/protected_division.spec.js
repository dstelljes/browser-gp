/**
 * @file
 * Tests the protected division function.
 */

'use strict';

var gp = require('../../../library');

var div = gp.functions.protectedDivision;

describe('protected division', function() {
  it('divides normally', function() {
    expect(div(9, 3)).toBe(3);
  });
 
  it('divides by zero!', function() {
    expect(div(9, 0)).toBe(1); 
  });
});
