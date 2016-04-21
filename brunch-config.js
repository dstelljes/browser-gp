'use strict';

module.exports = {
  conventions: {
    assets: /^frontend\/assets\//
  },
  files: {
    javascripts: {
      joinTo: {
        'app.js': /^frontend\/scripts\//,
        'vendor.js': [
          'bower_components/angular/angular.js'
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'app.css': /^frontend\/styles\//
      }
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
