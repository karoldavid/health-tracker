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
	dist: 'dist/',
	root: './'
};

var paths = {
	stylesheets: ['src/css/*.css'],
	scripts: ['src/js/app/models/*',
		'src/js/app/collections/*',
		'src/js/app/views/*',
		'src/js/app/app.js'],
	index: ['src/index.html'],
	extras: ['favicon.png'],
	dependencies: [ 'bower_components/jquery/dist/jquery.min.js',
		'bower_components/underscore/underscore-min.js',
		'bower_components/backbone/backbone-min.js',
		'bower_components/Materialize/dist/js/materialize.min.js']
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
		.pipe(gulp.dest('./'))
        .pipe(inject(
            gulp.src([paths.dependencies[0], paths.dependencies[1], paths.dependencies[2], paths.dependencies[3], './dist/js/app/*.js'],
                {read: false}), {relative: true}))
        .pipe(gulp.dest('./'))
        .pipe(inject(
            gulp.src('./dist/css/*.css',
            {read: false}), {relative: true}))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({stream:true}));
 });

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('copy', function() {
	gulp.src(paths.extras, {cwd: bases.src})
		.pipe(gulp.dest(bases.root));
});

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./src",
      routes: {
        '/bower_components': 'bower_components'
      },
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