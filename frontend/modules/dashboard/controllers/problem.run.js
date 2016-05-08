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
            {"name": "AgglomerativeCluster"},
            {"name": "CommunityStructure"},
            {"name": "HierarchicalCluster"},
            {"name": "MergeEdge"}
          ]
        },
        {
          "name": "graph",
          "children": [
            {"name": "BetweennessCentrality"},
            {"name": "LinkDistance"},
            {"name": "MaxFlowMinCut"},
            {"name": "ShortestPaths"},
            {"name": "SpanningTree"}
          ]
        },
        {
          "name": "optimization",
          "children": [
            {"name": "AspectRatioBanker"}
          ]
        }
      ]
    },
    {
      "name": "cluster",
      "children": [
        {"name": "AgglomerativeCluster"},
        {"name": "CommunityStructure"},
        {"name": "HierarchicalCluster"},
        {"name": "MergeEdge"}
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

  var bo = ["-", 10, ["*", ["+", 9, 8 ], 7 ], 6];

/**
 * Converts S expressions into d3 "flare.json" esque object
 *
 *   ***Example***
 * Input:  ["-",10,["*",["+",9,8],7],6]
 * Output: {"name":"-","children":[{"name":10},{"name":"*","children":
    [{"name":"+","children":[{"name":9},{"name":8}]},{"name":7}]},{"name":6}]}
 *
 * @function
 * @memberof functions
 *
 * @param {s-expression} sexpr
 *
 * @returns {treeOject}
 */

var makeTree = function(sexpr){
  if(!Array.isArray(sexpr)){
    return {"name" : sexpr};
  }else{
    var node = {
      "name" : sexpr[0]
    };

    node.children = [];
    for(var i=1; i<sexpr.length; i++){
      node.children.push(makeTree(sexpr[i]));
    }
    return node;
  }
}


var canvas = tree(makeTree(bo));
d3.select('#tree-container').call(canvas);
canvas.loadTree();
};
