'use strict';

var gulp          = require('gulp')
  , karma         = require('gulp-karma')
  , plugins       = require('gulp-load-plugins')()
  , concat        = require('gulp-concat')
  , uglify        = require('gulp-uglify')
  , minifyCSS     = require('gulp-minify-css')
  , htmlreplace   = require('gulp-html-replace')
  , argv          = require('yargs').argv;

gulp.task('lint', function() {
  return gulp.src(['./lib/**/*.js', './test/**/*.js', './app/**/*.js', 'gulpfile.js', 'app.js'])
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('cover', function() {
  return gulp.src(['./app/**/*.js', './lib/**/*.js'])
    .pipe(plugins.istanbul())
    .pipe(plugins.istanbul.hookRequire());
});

gulp.task('server-tests', ['cover'], function() {
  return gulp.src('./test/server/**/*.js')
    .pipe(plugins.mocha({ timeout: 4000, grep: argv.grep }))
    .pipe(plugins.istanbul.writeReports());
});

gulp.task('client-tests', function() {
  return gulp.src('./workaround')
  .pipe(karma({
    configFile: './karma.config.js',
    action: 'run'
  }))
  .once('end', function() {
    process.exit();
  })
  .on('error', function(err) {
    this.emit('end');
  });
});

gulp.task('styles', function() {
  var styles = [
    'public/bower_components/flat-ui/bootstrap/css/bootstrap.css',
    'public/bower_components/flat-ui/css/flat-ui.css',
    'public/bower_components/common-files/css/icon-font.css',
    'public/bower_components/common-files/css/animations.css',
    'public/bower_components/common-files/css/jquery.bxslider.css',
    'public/bower_components/ui-kit/ui-kit-header/css/ui-kit-styles.css',
    'public/bower_components/ui-kit/ui-kit-price/css/ui-kit-styles.css',
    'public/bower_components/ui-kit/ui-kit-footer/css/ui-kit-styles.css',
    'public/bower_components/select2/select2.css',
    'public/bower_components/bootstrap-datepicker/css/datepicker.css',
    'public/css/custom-tabs.css',
    'public/css/mrm.css',
    'public/css/flat-ui-select2.css'
  ];
  gulp.src(styles)
    .pipe(minifyCSS({ keepBreaks: true }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/build'));
});

gulp.task('scripts', function() {
  var scripts = [
    'public/bower_components/flat-ui/js/jquery-1.10.2.min.js',
    'public/bower_components/flat-ui/js/bootstrap.min.js',
    'public/bower_components/flat-ui/js/bootstrap-select.js',
    'public/bower_components/flat-ui/js/bootstrap-switch.js',
    'public/bower_components/flat-ui/js/flatui-checkbox.js',
    'public/bower_components/flat-ui/js/flatui-radio.js',
    'public/bower_components/flat-ui/js/bootstrap-switch.js',
    'public/bower_components/flat-ui/js/jquery.tagsinput.js',
    'public/bower_components/flat-ui/js/jquery.placeholder.js',
    'public/bower_components/common-files/js/jquery.scrollTo-1.4.3.1-min.js',
    'public/bower_components/common-files/js/modernizr.custom.js',
    'public/bower_components/common-files/js/page-transitions.js',
    'public/bower_components/common-files/js/easing.min.js',
    'public/bower_components/common-files/js/jquery.svg.js',
    'public/bower_components/common-files/js/jquery.svganim.js',
    'public/bower_components/common-files/js/jquery.parallax.min.js',
    'public/bower_components/common-files/js/startup-kit.js',
    'public/bower_components/select2/select2.js',
    'public/bower_components/moment/moment.js',
    'public/bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
    '/socket.io/socket.io.js',
    'public/bower_components/angular/angular.js',
    'public/bower_components/angular-resource/angular-resource.js',
    'public/bower_components/angular-route/angular-route.js',
    'public/bower_components/ngstorage/ngStorage.js',
    'public/bower_components/ngUpload/ng-upload.js',
    'public/bower_components/angular-socket-io/socket.js',
    'public/bower_components/angular-ui-select2/src/select2.js',
    'public/js/app/mrm.js',
    'public/js/app/directives/**/*.js',
    'public/js/app/routes/**/*.js',
    'public/js/app/controllers/**/*.js',
    'public/js/app/services/**/*.js',
    'public/js/app/mrm-run.js'
  ];
  return gulp.src(scripts)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/build'));
});

gulp.task('minify', ['styles', 'scripts'], function() {
  gulp.src('./app/views/home/index.ejs')
  .pipe(htmlreplace({
    css: 'build/app.min.css',
    js: 'build/app.min.js'
  }))
  .pipe(gulp.dest('./app/views/home/'));
});

gulp
.task('test', ['server-tests', 'client-tests'])
.task('default', ['lint', 'test', 'minify']);
