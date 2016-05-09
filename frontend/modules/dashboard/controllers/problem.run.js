'use strict';


module.exports = function($scope, d3, problem, run, tree) {
  $scope.problem = problem;
  $scope.run = run;
  $scope.worker = {
    instance: null,
    running: false
  };

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
  }, {
    bundled: true,
    category: 'Integers',
    key: 'protectedDivision',
    name: 'Protected division'
  }];

  $scope.evolve = function() {
    var worker = $scope.worker.instance = new Worker('workers/run.js');

    worker.postMessage({
      action: 'run',
      problem: $scope.problem,
      run: $scope.run
    });

    worker.onmessage = function(message) {
      switch (message.data.event) {
        case 'evolved':
          $scope.run.results.push(message.data);
          break;

        case 'finished':
          $scope.worker.running = false;
          break;

        case 'started':
          $scope.run.results = [];
          $scope.worker.running = true;
          break;
      }

      $scope.$apply();
    };
  };

  $scope.terminate = function() {
    if ($scope.worker.instance) {
      $scope.worker.instance.terminate();
      $scope.worker.running = false;
    }
  }
};
