'use strict';

var gulp      = require('gulp')
  , plugins   = require('gulp-load-plugins')()
  , concat    = require('gulp-concat')
  , uglify    = require('gulp-uglify')
  , minifyCSS = require('gulp-minify-css')
  , argv      = require('yargs').argv
  , scripts   = []
  , styles    = [];

gulp.task('lint', function() {
  return gulp.src(['./lib/**/*.js', './spec/**/*.js', './app/**/*.js', 'gulpfile.js', 'app.js'])
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('cover', function() {
  return gulp.src(['./app/**/*.js', './lib/**/*.js'])
    .pipe(plugins.istanbul());
});

gulp.task('test', ['cover'], function() {
  return gulp.src('./spec/**/*.js')
    .pipe(plugins.mocha({ timeout: 8000, grep: argv.grep }))
    .pipe(plugins.istanbul.writeReports())
    .once('end', function() {
      process.exit();
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

gulp.task('default', ['lint', 'test', 'scripts', 'styles']);
