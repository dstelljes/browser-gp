'use strict';

var data = {
  "name": "flare",
  "children": [
    {
      "name": "analytics",
      "children": [
        {
          "name": "cluster",
          "children": [
            {"name": "AgglomerativeCluster", "size": 3938},
            {"name": "CommunityStructure", "size": 3812},
            {"name": "HierarchicalCluster", "size": 6714},
            {"name": "MergeEdge", "size": 743}
          ]
        },
        {
          "name": "graph",
          "children": [
            {"name": "BetweennessCentrality", "size": 3534},
            {"name": "LinkDistance", "size": 5731},
            {"name": "MaxFlowMinCut", "size": 7840},
            {"name": "ShortestPaths", "size": 5914},
            {"name": "SpanningTree", "size": 3416}
          ]
        },
        {
          "name": "optimization",
          "children": [
            {"name": "AspectRatioBanker", "size": 7074}
          ]
        }
      ]
    },
    {
      "name": "cluster",
      "children": [
        {"name": "AgglomerativeCluster", "size": 3938},
        {"name": "CommunityStructure", "size": 3812},
        {"name": "HierarchicalCluster", "size": 6714},
        {"name": "MergeEdge", "size": 743}
      ]
    }
  ]
};

module.exports = function($scope, d3, problem, run, tree) {
  $scope.problem = problem;
  $scope.run = run;

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
  }];

  var canvas = tree(data);
  d3.select('#tree-container').call(canvas);
  canvas.loadTree();
};
