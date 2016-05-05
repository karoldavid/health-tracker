var jshint = require('gulp-jshint');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concatify = require('gulp-concat');

var paths = {
	stylesheets: ['src/css/*.css'],
	scripts: ['src/js/app/models/*', 'src/js/app/collections/*', 'src/js/app/views/*', 'src/js/app/app.js']
};


gulp.task('css', function() {
    gulp.src(paths.stylesheets)
        .pipe(stylus({compress: false, paths: ['src/css']}))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(concatify('styles.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function () {
   return gulp.src(paths.scripts)
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concatify('app.min.js'))
      .pipe(gulp.dest('dist/js/app'));
});

gulp.task('default', function() {
    console.log("Yeah, I'm gulpin!");
});
