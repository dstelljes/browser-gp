'use strict';

angular.module('dashboard', ['ui.router']).config(function($stateProvider) {
  $stateProvider.state('problem', {
    controller: require('controllers/problem'),
    templateUrl: 'partials/problem.html',
    url: '/'
  });
});
