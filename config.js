'use strict';

module.exports = {
  conventions: {
    assets: /^frontend\/assets\//
  },
  files: {
    javascripts: {
      joinTo: {
        'js/dashboard.js': /^frontend\/modules\/dashboard\//,
        'js/gp.js': /^library\//,
        'js/vendor.js': [
          'bower_components/angular/angular.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/ngstorage/ngStorage.js'
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
      return path.replace(/^frontend\/modules\//, '');
    }
  },
  npm: {
    globals: {
      gp: './library'
    }
  },
  paths: {
    public: 'build',
    watched: ['bower_components', 'frontend', 'library']
  },
  server: {
    noPushState: true,
    port: 56267
  }
};
