'use strict';

module.exports = function($scope, problem, run) {
  $scope.problem = problem;
  $scope.run = run;

  $scope.functions = [{
    bundled: true,
    category: 'Integers',
    key: 'addition',
    name: 'Addition'
  }, {
    bundled: true,
    category: 'Integers',
    key: 'subtraction',
    name: 'Subtraction'
  }, {
    bundled: true,
    category: 'Integers',
    key: 'multiplication',
    name: 'Multiplication'
  }, {
    bundled: true,
    category: 'Integers',
    key: 'division',
    name: 'Division'
  }];
};
