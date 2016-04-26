'use strict';

angular.module('dashboard', ['ngStorage', 'ui.router']).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('problem', {
    controller: require('./controllers/problem'),
    templateUrl: 'partials/dashboard.problem.html',
    url: ''
  });
}).value('gp', gp);
