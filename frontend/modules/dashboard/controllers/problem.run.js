'use strict';

module.exports = function($scope, problem, run) {
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
          console.log('Generation ' + message.data.generation + ' had best score ' + message.data.best);
          break;

        case 'finished':
          $scope.worker.running = false;
          break;

        case 'started':
          $scope.worker.running = true;
          break;
      }
    };
  };
};
