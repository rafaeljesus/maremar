var gulp = require('gulp')
, concat = require('gulp-concat')
, uglify = require('gulp-uglify')
, minifyCSS = require('gulp-minify-css');

var scripts = [];

gulp.task('scripts', function() {
  return gulp.src(scripts)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/build/js'));
});

var styles = [];

gulp.task('styles', function() {
  gulp.src(styles)
    .pipe(minifyCSS({ keepBreaks:true }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/build/css'))
});

gulp.task('default', ['scripts', 'styles']);
