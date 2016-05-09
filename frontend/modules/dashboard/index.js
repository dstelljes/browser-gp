'use strict';

angular.module('dashboard', ['checklist-model', 'ngStorage', 'ui.router'])
  .config(function($localStorageProvider) {
    // Because we're abstracting the storage mechanism away from the controllers,
    // default stuff gets set here. Later on, we'll inject the models into the
    // controllers.

    $localStorageProvider.setKeyPrefix('browser-gp-');

    if (!$localStorageProvider.get('problems')) {
      $localStorageProvider.set('problems', {});
    }
  })
  .config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('problem', {
        controller: require('./controllers/problem'),
        resolve: {
          problems: function($localStorage) {
            return $localStorage.problems;
          }
        },
        templateUrl: 'partials/dashboard.problem.html',
        url: '/'
      })
      .state('problem.detail', {
        controller: require('./controllers/problem.detail'),
        resolve: {
          problem: function($stateParams, problems) {
            return problems[$stateParams.problem];
          }
        },
        templateUrl: 'partials/dashboard.problem.detail.html',
        url: ':problem'
      })
      .state('problem.run', {
        controller: require('./controllers/problem.run'),
        parent: 'problem.detail',
        resolve: {
          run: function($stateParams, problem) {
            return problem.runs[$stateParams.run];
          },
          tree: function(d3) {
            return require('./graphs/tree')(d3);
          }
        },
        templateUrl: 'partials/dashboard.problem.run.html',
        url: '/:run'
      });
  })
  .directive('variableType', require('./directives/variable_type'))
  .directive('programTree', require('./directives/program_tree'))
  .value('gp', gp)
  .value('d3', d3);
