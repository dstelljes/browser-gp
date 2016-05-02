'use strict';

module.exports = function($scope, $state, $stateParams, problem) {
  $scope.problem = problem;

  $scope.removeProblem = function() {
    $scope.$parent.removeProblem($stateParams.problem);
  };

  $scope.addRun = function() {
    var count = $scope.problem.runs.push({
      name: '',
      constants: [],
      depth: 5,
      fitness: null,
      functions: [],
      generations: 50,
      operations: [],
      maximize: true,
      random: null,
      selection: null
    });

    $state.go('problem.run', {
      run: count - 1
    });
  };

  $scope.removeRun = function(index) {
    $scope.problem.runs.splice(index, 1);
  };
};
