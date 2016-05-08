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
      mutations: [],
      recombinations: [],
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

  $scope.addVariable = function() {
    $scope.problem.variables.push({
      name: '',
      type: 'number'
    });
  };

  $scope.removeVariable = function(index) {
    $scope.problem.variables.splice(index, 1);

    // There's maybe a cleaner way to do this...
    $scope.problem.tests.forEach(function(test) {
      test.inputs.splice(index, 1);
    });
  };

  $scope.addTest = function() {
    $scope.problem.tests.push({
      inputs: [],
      output: ''
    });
  };
};
