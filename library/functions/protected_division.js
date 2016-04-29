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
 * @return {number}
 */
var division = module.exports = function(a, b) {
  if(b == 0){
    //returning 1 rather than 0 is a consious choice as it creates seems to create
    //more interesting programs. Credit to Nic McPhee on this.
      return 1;
  }else{
    return a / b;
  }
};

/**
 * Displays the operator symbol when stringified.
 *
 * @return {string}
 */
division.toString = function() {
  return '/';
};
