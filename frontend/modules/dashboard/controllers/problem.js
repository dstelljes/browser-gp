'use strict';

module.exports = function($localStorage, $scope, $state, problems) {
  $scope.problems = problems;

  $scope.addProblem = function() {
    var id = slug(3);

    $scope.problems[id] = {
      name: '',
      description: '',
      variables: [],
      tests: [],
      runs: []
    };

    $state.go('problem.detail', {
      problem: id
    });
  };

  $scope.removeProblem = function(id) {
    $state.go('problem').then(function() {
      delete $scope.problems[id];
    });
  };
};

// Odds of a collision are 1/1520760, so not going to worry about it.
var codenames = [
  'aladdin', 'allegro', 'amazon', 'ansel', 'antares', 'apex', 'apollo',
  'artemis', 'asahi', 'atlanta', 'atlantic', 'aurora', 'autobahn', 'beaker',
  'bismol', 'blackbird', 'bongo', 'brooks', 'bunsen', 'cabernet', 'capone',
  'catalyst', 'chablis', 'cheetah', 'chimera', 'cinnamon', 'civic', 'clockwork',
  'cobra', 'comet', 'converse', 'crusader', 'cupid', 'cyan', 'cyclone',
  'cypher', 'darwin', 'derringer', 'dulcimer', 'eclipse', 'elixir', 'epic',
  'escher', 'espirit', 'excalibur', 'figment', 'flagship', 'fortissimo',
  'freeport', 'fridge', 'gazelle', 'gemini', 'gossamer', 'gonzo', 'hacksaw',
  'hammerhead', 'harmony', 'hero', 'hokusai', 'hook', 'hooper', 'horizon',
  'innsbruck', 'ivory', 'jaguar', 'kanga', 'kirkwood', 'kodiak', 'laguna',
  'leopard', 'lion', 'lisa', 'macintosh', 'marble', 'malibu', 'maui',
  'mavericks', 'mercury', 'milwaukee', 'minuet', 'monet', 'montana', 'mustang',
  'nautilus', 'nexus', 'nitro', 'omega', 'onyx', 'optimus', 'panther', 'paris',
  'phoenix', 'pinball', 'pomona', 'puma', 'prism', 'reno', 'rhapsody',
  'rosebud', 'rubicon', 'sonata', 'skia', 'stealth', 'singray', 'sundance',
  'tailgate', 'tangent', 'tempest', 'tempo', 'terminator', 'tiger', 'titan',
  'trailblazer', 'trinity', 'tsunami', 'typhoon'
];

var slug = module.exports.slug = function(length) {
  var words = [];

  for (var i = 0; i < length; i++) {
    words.push(codenames[Math.floor(Math.random() * codenames.length)]);
  }

  return words.join('-');
};
