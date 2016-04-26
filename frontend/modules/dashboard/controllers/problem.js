'use strict';

module.exports = function($localStorage, $scope) {
  $scope.persistent = $localStorage.$default({
    problems: {}
  });
};
