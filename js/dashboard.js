(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("dashboard/controllers/problem.detail.js", function(exports, require, module) {
'use strict';

module.exports = function($scope, $state, $stateParams, problem) {
  $scope.problem = problem;

  $scope.removeProblem = function() {
    $scope.$parent.removeProblem($stateParams.problem);
  };

  $scope.addRun = function() {
    var count = $scope.problem.runs.push({
      name: '',
      constants: [],
      depth: 5,
      fitness: null,
      functions: [],
      generations: 50,
      mutations: [],
      maximize: false,
      random: null,
      recombinations: [],
      selection: null,
      results: []
    });

    $state.go('problem.run', {
      run: count - 1
    });
  };

  $scope.removeRun = function(index) {
    $scope.problem.runs.splice(index, 1);
  };

  $scope.addVariable = function() {
    $scope.problem.variables.push({
      name: '',
      type: 'number'
    });
  };

  $scope.removeVariable = function(index) {
    $scope.problem.variables.splice(index, 1);

    // There's maybe a cleaner way to do this...
    $scope.problem.tests.forEach(function(test) {
      test.inputs.splice(index, 1);
    });
  };

  $scope.addTest = function() {
    $scope.problem.tests.push({
      inputs: [],
      output: ''
    });
  };

  $scope.removeTest = function(index) {
    $scope.problem.tests.splice(index, 1);
  };
};

});

require.register("dashboard/controllers/problem.js", function(exports, require, module) {
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
      type: 'number',
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

});

require.register("dashboard/controllers/problem.run.js", function(exports, require, module) {
'use strict';


module.exports = function($scope, d3, problem, run, tree) {
  $scope.problem = problem;
  $scope.run = run;
  $scope.tree = tree;
  $scope.worker = {
    instance: null,
    running: false
  };

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
  }, {
    bundled: true,
    category: 'Integers',
    key: 'protectedDivision',
    name: 'Protected division'
  }];

  $scope.evolve = function() {
    var worker = $scope.worker.instance = new Worker('workers/run.js');

    worker.postMessage({
      action: 'run',
      problem: $scope.problem,
      run: $scope.run
    });

    worker.onmessage = function(message) {
      switch (message.data.event) {
        case 'evolved':
          $scope.run.results.push(message.data);
          break;

        case 'finished':
          $scope.worker.running = false;
          break;

        case 'started':
          $scope.run.results = [];
          $scope.worker.running = true;
          break;
      }

      $scope.$apply();
    };
  };

  $scope.terminate = function() {
    if ($scope.worker.instance) {
      $scope.worker.instance.terminate();
      $scope.worker.running = false;
    }
  }
};

});

require.register("dashboard/directives/program_tree.js", function(exports, require, module) {
'use strict';

module.exports = function(d3) {

    var link = function(scope, element){
      function draw(){
        var canvas = scope.canvas(makeTree(scope.program));
        console.log(element);
        d3.selectAll(element).call(canvas);
        canvas.loadTree();
        console.log("toot toot");
      }

      scope.$watch("tree", draw);
    }


    return{
      scope: {
        canvas: '=',
        program: '='
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

});

;require.register("dashboard/directives/variable_type.js", function(exports, require, module) {
'use strict';

module.exports = function() {

  return {
    scope: {
      model: '=ngModel'
    },
    templateUrl: 'directives/variable_type.html'
  }
};

});

require.register("dashboard/graphs/tree.js", function(exports, require, module) {
'use strict';
//Source: http://www.billdwhite.com/wordpress/2014/02/03/d3-pan-and-zoom-reuse-demo/
var tree = module.exports = function(d3) {

  var canvas = module.exports = function(root) {

    var _width           = 400,
    _height          = 450,
    zoomEnabled     = true,
    dragEnabled     = true,
    scale           = 1,
    translation     = [0,0],
    base            = null,
    wrapperBorder   = 2,
    //minimap         = null,
    minimapPadding  = 20,
    minimapScale    = 0.25,
    nodes           = [],
    circles         = [];

    function canvas(selection) {

      base = selection;

      var xScale = d3.scale.linear()
      .domain([-_width / 2, _width / 2])
      .range([0, _width]);

      var yScale = d3.scale.linear()
      .domain([-_height / 2, _height / 2])
      .range([_height, 0]);

      var zoomHandler = function(newScale) {
        if (!zoomEnabled) { return; }
        if (d3.event) {
          scale = d3.event.scale;
        } else {
          scale = newScale;
        }
        if (dragEnabled) {
          var tbound = -_height * scale,
          bbound = _height  * scale,
          lbound = -_width  * scale,
          rbound = _width   * scale;
          // limit translation to thresholds
          translation = d3.event ? d3.event.translate : [0, 0];
          translation = [
            Math.max(Math.min(translation[0], rbound), lbound),
            Math.max(Math.min(translation[1], bbound), tbound)
          ];
        }

        d3.select(".panCanvas, .panCanvas .bg")
        .attr("transform", "translate(" + translation + ")" + " scale(" + scale + ")");

        minimap.scale(scale).render();
      }; // startoff zoomed in a bit to show pan/zoom rectangle

      var zoom = d3.behavior.zoom()
      .x(xScale)
      .y(yScale)
      .scaleExtent([0.5, 5])
      .on("zoom.canvas", zoomHandler);

      var svg = selection.append("svg")
      .attr("class", "svg canvas")
      .attr("width",  _width  + (wrapperBorder*2) + minimapPadding*2 + (_width*minimapScale))
      .attr("height", _height + (wrapperBorder*2) + minimapPadding*2)
      .attr("shape-rendering", "auto");

      var svgDefs = svg.append("defs");

      svgDefs.append("clipPath")
      .attr("id", "wrapperClipPathDemo01_cwbjo")
      .attr("class", "wrapper clipPath")
      .append("rect")
      .attr("class", "background")
      .attr("width", _width)
      .attr("height", _height);

      svgDefs.append("clipPath")
      .attr("id", "minimapClipPath_cwbjo")
      //.attr("class", "minimap clipPath")
      .attr("width", _width)
      .attr("height", _height)
      .attr("transform", "translate(" + (_width + minimapPadding) + "," + (minimapPadding/2) + ")")
      .append("rect")
      .attr("class", "background")
      .attr("width", _width)
      .attr("height", _height);

      var filter = svgDefs.append("svg:filter")
      .attr("id", "minimapDropShadow_cwbjo")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "150%")
      .attr("height", "150%");

      filter.append("svg:feOffset")
      .attr("result", "offOut")
      .attr("in", "SourceGraphic")
      .attr("dx", "1")
      .attr("dy", "1");

      filter.append("svg:feColorMatrix")
      .attr("result", "matrixOut")
      .attr("in", "offOut")
      .attr("type", "matrix")
      .attr("values", "0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.5 0");

      filter.append("svg:feGaussianBlur")
      .attr("result", "blurOut")
      .attr("in", "matrixOut")
      .attr("stdDeviation", "10");

      filter.append("svg:feBlend")
      .attr("in", "SourceGraphic")
      .attr("in2", "blurOut")
      .attr("mode", "normal");

      var minimapRadialFill = svgDefs.append("radialGradient")
      .attr({
        id:"minimapGradient_cwbjo",
        gradientUnits:"userSpaceOnUse",
        cx:"500",
        cy:"500",
        r:"400",
        fx:"500",
        fy:"500"
      });
      minimapRadialFill.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#FFFFFF");
      minimapRadialFill.append("stop")
      .attr("offset", "40%")
      .attr("stop-color", "#EEEEEE");
      minimapRadialFill.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#E0E0E0");

      var outerWrapper = svg.append("g")
      .attr("class", "wrapper outer")
      .attr("transform", "translate(0, " + minimapPadding + ")");

      outerWrapper.append("rect")
      .attr("class", "background")
      .attr("width", _width + wrapperBorder*2)
      .attr("height", _height + wrapperBorder*2);

      var innerWrapper = outerWrapper.append("g")
      .attr("class", "wrapper inner")
      .attr("clip-path", "url(#wrapperClipPathDemo01_cwbjo)")
      .attr("transform", "translate(" + (wrapperBorder) + "," + (wrapperBorder) + ")")
      .call(zoom);

      innerWrapper.append("rect")
      .attr("class", "background")
      .attr("width", _width)
      .attr("height", _height);

      var panCanvas = innerWrapper.append("g")
      .attr("class", "panCanvas")
      .attr("width", _width)
      .attr("height", _height)
      .attr("transform", "translate(0,0)");

      panCanvas.append("rect")
      .attr("class", "background")
      .attr("width", _width)
      .attr("height", _height);

      minimap = minimap()
      .zoom(zoom)
      .target(panCanvas)
      .minimapScale(minimapScale)
      .x(_width + minimapPadding)
      .y(minimapPadding);

      svg.call(minimap);

      // startoff zoomed in a bit to show pan/zoom rectangle
      zoom.scale(1.5);
      zoomHandler(1.5);

      /** ADD SHAPE **/
      canvas.addItem = function(item) {
        panCanvas.node().appendChild(item.node());
        minimap.render();
      };


      canvas.loadTree = function() {
        var diameter = 400;

        var tree = d3.layout.tree()
        .size([diameter, diameter])
        .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

        var diagonal = d3.svg.diagonal.radial()
        .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

        var treeCanvas = panCanvas.append("g")
        .classed("radialtree", true)
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")scale(.4)");

        var nodes = tree.nodes(root),
        links = tree.links(nodes);

        var link = treeCanvas.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

        var node = treeCanvas.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

        node.append("circle")
        .attr("r", .5);

        node.append("text")
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
        .text(function(d) { return d.name; });

        minimap.render();


        //d3.select(self.frameElement).style("height", _height + "px");
      }


      /** RENDER **/
      canvas.render = function() {
        svgDefs
        .select(".clipPath .background")
        .attr("width", _width)
        .attr("height", _height);

        svg
        .attr("width",  _width  + (wrapperBorder*2) + minimapPadding*2 + (_width*minimapScale))
        .attr("height", _height + (wrapperBorder*2));

        outerWrapper
        .select(".background")
        .attr("width", _width + wrapperBorder*2)
        .attr("height", _height + wrapperBorder*2);

        innerWrapper
        .attr("transform", "translate(" + (wrapperBorder) + "," + (wrapperBorder) + ")")
        .select(".background")
        .attr("width", _width)
        .attr("height", _height);

        panCanvas
        .attr("width", _width)
        .attr("height", _height)
        .select(".background")
        .attr("width", _width)
        .attr("height", _height);

        minimap
        .x(_width + minimapPadding)
        .y(minimapPadding)
        .render();
      };

      canvas.zoomEnabled = function(isEnabled) {
        if (!arguments.length) { return zoomEnabled; }
        zoomEnabled = isEnabled;
      };

      canvas.dragEnabled = function(isEnabled) {
        if (!arguments.length) { return dragEnabled; }
        dragEnabled = isEnabled;
      };

      canvas.reset = function() {
        d3.transition().duration(750).tween("zoom", function() {
          var ix = d3.interpolate(xScale.domain(), [-_width  / 2, _width  / 2]),
          iy = d3.interpolate(yScale.domain(), [-_height / 2, _height / 2]),
          iz = d3.interpolate(scale, 1);
          return function(t) {
            zoom.scale(iz(t)).x(xScale.domain(ix(t))).y(yScale.domain(iy(t)));
            zoomHandler(iz(t));
          };
        });
      };
    }


    //============================================================
    // Accessors
    //============================================================


    canvas.width = function(value) {
      if (!arguments.length) return _width;
      _width = parseInt(value, 10);
      return this;
    };

    canvas.height = function(value) {
      if (!arguments.length) return _height;
      _height = parseInt(value, 10);
      return this;
    };

    canvas.scale = function(value) {
      if (!arguments.length) { return scale; }
      scale = value;
      return this;
    };

    canvas.nodes = function(value) {
      if (!arguments.length) { return nodes; }
      nodes = value;
      return this;
    };

    return canvas;
  };

  var minimap = function() {

    "use strict";

    var minimapScale    = 0.1,
    scale           = 1,
    zoom            = null,
    base            = null,
    target          = null,
    width           = 0,
    height          = 0,
    x               = 0,
    y               = 0,
    frameX          = 0,
    frameY          = 0;

    function minimap(selection) {

      base = selection;

      var container = selection.append("g")
      .attr("class", "minimap")
      .call(zoom);

      zoom.on("zoom.minimap", function() {
        scale = d3.event.scale;
      });


      minimap.node = container.node();

      var frame = container.append("g")
      .attr("class", "frame");

      frame.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .attr("filter", "url(#minimapDropShadow_cwbjo)");

      var drag = d3.behavior.drag()
      .on("dragstart.minimap", function() {
        var frameTranslate = getXYFromTranslate(frame.attr("transform"));
        frameX = frameTranslate[0];
        frameY = frameTranslate[1];
      })
      .on("drag.minimap", function() {
        d3.event.sourceEvent.stopImmediatePropagation();
        frameX += d3.event.dx;
        frameY += d3.event.dy;
        frame.attr("transform", "translate(" + frameX + "," + frameY + ")");
        var translate =  [(-frameX*scale),(-frameY*scale)];
        target.attr("transform", "translate(" + translate + ")scale(" + scale + ")");
        zoom.translate(translate);
      });

      frame.call(drag);

      /** RENDER **/
      minimap.render = function() {
        scale = zoom.scale();
        container.attr("transform", "translate(" + x + "," + y + ")scale(" + minimapScale + ")");
        var node = target.node().cloneNode(true);
        node.removeAttribute("id");
        base.selectAll(".minimap .panCanvas").remove();
        minimap.node.appendChild(node);
        var targetTransform = getXYFromTranslate(target.attr("transform"));
        frame.attr("transform", "translate(" + (-targetTransform[0]/scale) + "," + (-targetTransform[1]/scale) + ")")
        .select(".background")
        .attr("width", width/scale)
        .attr("height", height/scale);
        frame.node().parentNode.appendChild(frame.node());
        d3.select(node).attr("transform", "translate(1,1)");
      };
    }


    //============================================================
    // Accessors
    //============================================================


    minimap.width = function(value) {
      if (!arguments.length) return width;
      width = parseInt(value, 10);
      return this;
    };


    minimap.height = function(value) {
      if (!arguments.length) return height;
      height = parseInt(value, 10);
      return this;
    };


    minimap.x = function(value) {
      if (!arguments.length) return x;
      x = parseInt(value, 10);
      return this;
    };


    minimap.y = function(value) {
      if (!arguments.length) return y;
      y = parseInt(value, 10);
      return this;
    };


    minimap.scale = function(value) {
      if (!arguments.length) { return scale; }
      scale = value;
      return this;
    };


    minimap.minimapScale = function(value) {
      if (!arguments.length) { return minimapScale; }
      minimapScale = value;
      return this;
    };


    minimap.zoom = function(value) {
      if (!arguments.length) return zoom;
      zoom = value;
      return this;
    };


    minimap.target = function(value) {
      if (!arguments.length) { return target; }
      target = value;
      width  = parseInt(target.attr("width"),  10);
      height = parseInt(target.attr("height"), 10);
      return this;
    };

    return minimap;
  };




  var forcecircle = function() {

    "use strict";

    var cx          = 0,
    cy          = 0,
    r           = 0,
    color       = "#000000",
    node        = null,
    base        = null;

    function forcecircle(selection) {
      base = selection;
      forcecircle.base = base;
      node = base.append("circle")
      .attr("class", "forcecircle");

      function render() {
        node.attr("cx", cx)
        .attr("cy", cy)
        .attr("r",  r)
        .style("fill", color);
      }

      forcecircle.render = render;

      render();

    }


    //============================================================
    // Accessors
    //============================================================


    forcecircle.cx = function(value) {
      if (!arguments.length) return cx;
      cx = parseInt(value, 10);
      return this;
    };

    forcecircle.cy = function(value) {
      if (!arguments.length) return cy;
      cy = parseInt(value, 10);
      return this;
    };

    forcecircle.r = function(value) {
      if (!arguments.length) return r;
      r = parseInt(value, 10);
      return this;
    };

    forcecircle.color = function(value) {
      if (!arguments.length) return color;
      color = value;
      return this;
    };

    forcecircle.node = function() {
      return node;
    };

    forcecircle.x = 0;
    forcecircle.y = 0;

    return forcecircle;
  };

  var getXYFromTranslate = function(translateString) {
    var currentTransform = d3.transform(translateString);
    var currentX = currentTransform.translate[0];
    var currentY = currentTransform.translate[1];
    return [currentX, currentY];
  };

  return canvas;

};

});

require.register("dashboard/index.js", function(exports, require, module) {
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

});

require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.gp = require("./library");


});})();require('___globals___');

