var jshint = require('gulp-jshint');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concatify = require('gulp-concat');
var inject = require('gulp-inject');
var del = require('del');
var browserSync = require('browser-sync');

var bases = {
	src: 'src/',
	dist: 'dist/'
};

var paths = {
	stylesheets: ['src/css/*.css'],
	scripts: ['src/js/app/models/*', 'src/js/app/collections/*', 'src/js/app/views/*', 'src/js/app/app.js'],
	index: ['src/index.html'],
	extras: ['favicon.png']
};

gulp.task('css', function() {
    gulp.src(paths.stylesheets)
        .pipe(stylus({compress: false, paths: ['src/css']}))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(concatify('styles.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function () {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concatify('app.min.js'))
		.pipe(gulp.dest('dist/js/app'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('index', function(){
	return gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'))
        .pipe(inject(
            gulp.src('./dist/js/app/*.js',
                {read: false}), {relative: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(inject(
            gulp.src('./dist/css/*.css',
            {read: false}), {relative: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream:true}));
 });

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('copy', function() {
	gulp.src(paths.extras, {cwd: bases.src})
		.pipe(gulp.dest(bases.dist));
});

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./",
      browser: "google chrome"
    }
  });
});

gulp.task('watch', function() {
	gulp.watch(paths.stylesheets, ['css']);
	gulp.watch(paths.scripts, ['jshint', 'js']);
	gulp.watch(paths.index, ['index']);
});

gulp.task('start', ['watch', 'browser-sync']);

gulp.task('default', ['clean', 'css', 'js', 'index', 'copy']);