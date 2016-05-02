'use strict';

angular.module('dashboard', ['ngStorage', 'ui.router'])
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
          problem: function($localStorage, $stateParams) {
            return $localStorage.problems[$stateParams.problem];
          },
          remove: function($localStorage, $state, $stateParams) {
            return function() {
              $state.go('problem').then(function() {
                delete $localStorage.problems[$stateParams.problem];
              });
            };
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
          }
        },
        templateUrl: 'partials/dashboard.problem.run.html',
        url: '/:run'
      });
  })
  .value('gp', gp);
