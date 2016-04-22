'use strict';

module.exports = {
  conventions: {
    assets: /^frontend\/assets\//
  },
  files: {
    javascripts: {
      joinTo: {
        'js/dashboard.js': /^frontend\/scripts\//,
        'js/vendor.js': [
          'bower_components/angular/angular.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js'
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'css/dashboard.css': 'frontend/styles/dashboard.scss'
      }
    }
  },
  modules: {
    nameCleaner: function(path) {
      return path.replace(/^frontend\/scripts\//, '');
    }
  },
  paths: {
    public: 'build',
    watched: ['bower_components', 'frontend']
  },
  server: {
    noPushState: true,
    port: 56267
  }
};
