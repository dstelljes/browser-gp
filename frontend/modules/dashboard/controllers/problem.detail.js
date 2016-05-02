'use strict';

module.exports = function($scope, problem, remove) {
  $scope.problem = problem;
  $scope.removeProblem = remove;

  $scope.addRun = function() {
    $scope.problem.runs.push({
      constants: [],
      functions: [],
      selection: null,
      fitness: null,
      maximize: true,
      operations: [],
      random: null,
      depth: 5,
      generations: 50
    });
  };

  $scope.removeRun = function(index) {
    $scope.problem.runs.splice(index, 1);
  };
};
