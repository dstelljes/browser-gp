

//example tree from http://www.billdwhite.com/wordpress/2014/02/03/d3-pan-and-zoom-reuse-demo/
///*
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
}


var drawTree = function(){
  var canvas = d3.demo.canvas(data);
  d3.select("#tree-container").call(canvas);
  canvas.loadTree();
}


//*/
