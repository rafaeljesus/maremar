module.exports = function(config) {

  config.set({

    basePath: '',

    frameworks: ['jasmine-jquery', 'jasmine'],

    exclude: ['public/bower_components/flat-ui/js/jquery-1.10.2.min.map'],

    files: [
      'node_modules/mocha/mocha.js',
      'node_modules/chai/chai.js',
      'node_modules/sinon-chai/lib/sinon-chai.js',
      'node_modules/sinon/pkg/sinon.js',
      'public/bower_components/flat-ui/js/jquery-1.10.2.min.js',
      'public/bower_components/flat-ui/js/flatui-checkbox.js',
      'public/bower_components/flat-ui/js/bootstrap.min.js',
      'public/bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-resource/angular-resource.js',
      'public/bower_components/angular-route/angular-route.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/bower_components/ngstorage/ngStorage.js',
      'public/bower_components/ngUpload/ng-upload.js',
      'public/bower_components/angular-ui-select2/src/select2.js',
      'public/bower_components/angular-socket-io/socket.js',
      'public/bower_components/moment/moment.js',
      'public/js/app/mrm.js',
      'public/js/app/utils/**/*.js',
      'public/js/app/controllers/**/*.js',
      'public/js/app/services/**/*.js',
      'test/client/utils/*.js',
      'test/client/fixtures/*.js',
      'test/client/**/*Spec.js',
      'public/js/app/mrm-run.js'
    ],

    preprocessors: {
    },

    // possible values: 'dots', 'progress'
    reporters: ['progress'],

    port: 9876,

    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
