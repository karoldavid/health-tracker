var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concatify = require('gulp-concat');

var paths = {
	stylesheets: ['src/css/*.css'],
};


gulp.task('css', function() {
    gulp.src(paths.stylesheets)
        .pipe(stylus({compress: false, paths: ['src/css']}))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(concatify('styles.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('default', function() {
    console.log("Yeah, I'm gulpin!");
});
