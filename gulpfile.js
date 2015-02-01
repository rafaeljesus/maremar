'use strict';

var gulp      = require('gulp')
  , karma     = require('gulp-karma')
  , plugins   = require('gulp-load-plugins')()
  , concat    = require('gulp-concat')
  , uglify    = require('gulp-uglify')
  , minifyCSS = require('gulp-minify-css')
  , argv      = require('yargs').argv
  , scripts   = []
  , styles    = [];

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
  return gulp.src('./test/client/**/*[sS]pec.js')
  .pipe(karma({
    configFile: 'karma.conf.js',
    action: 'run'
  }))
  .once('end', function() {
    process.exit();
  });
  .on('error', function(err) {
    throw err;
  });
});

gulp.task('scripts', function() {
  return gulp.src(scripts)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/build/js'));
});

gulp.task('styles', function() {
  gulp.src(styles)
    .pipe(minifyCSS({ keepBreaks:true }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/build/css'));
});

gulp
  .task('test', ['server-tests', 'client-tests']);
  .task('default', ['lint', 'test', 'scripts', 'styles']);
