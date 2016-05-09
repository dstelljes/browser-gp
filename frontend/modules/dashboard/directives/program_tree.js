'use strict';

module.exports = function() {

    var link = function(scope, element){
      var canvas = tree(makeTree(scope.tree));
      element.call(canvas);
      canvas.loadTree();
    }

    return{
      scope: {
        tree: '='
      },
      link:link
    };


};



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
