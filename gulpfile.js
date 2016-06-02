var gulp = require('gulp'),
	gutil =  require('gulp-util'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	htmlmin = require('gulp-htmlmin'),
	imageop = require('gulp-image-optimization'),
	webserver = require('gulp-webserver');


var sassSrc = 'components/sass/**/*.scss';
var htmlSrc = 'build/development/**/*.html';
var cssSrc = 'build/development/css/*.css';
var jsSrc =   'build/development/app/**/*.js';
var appSrc= 'builds/development',
	tsSrc= 'process/typescript';


gulp.task('connect', function() {
  connect.server({
    root: 'build/development',
    livereload: true
  });
});

gulp.task('webserver', function() {
  gulp.src('build/development')
    .pipe(webserver({
      livereload: true,
	  fallback:'calendar.html',
      open: true
    }));
});

gulp.task('html', function () {
  gulp.src(htmlSrc)
    .pipe(connect.reload());
});

gulp.task('sass',function(){
	return gulp.src(sassSrc)
	.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
	.pipe(gulp.dest('build/development/css'));
});

gulp.task('compress', function() {
  return gulp.src(jsSrc)
    .pipe(uglify())
    .pipe(gulp.dest('build/production/app'))
	.pipe(connect.reload());
});

gulp.task('minify-css', function() {
  return gulp.src(cssSrc)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/production/css'))
	.pipe(connect.reload());
});

gulp.task('minify', function() {
  return gulp.src(htmlSrc)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/production'))
	.pipe(connect.reload());
});

/*gulp.task('images', function(cb) {
    gulp.src('build/development/image/*')
	.pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
	.pipe(gulp.dest('build/production/image')).on('end', cb).on('error', cb)
	.pipe(connect.reload());
});
*/
gulp.task('watch',function(){
	gulp.watch(htmlSrc,['html','minify']);
	gulp.watch(sassSrc,['sass']);	
	gulp.watch(jsSrc,['compress']);
	gulp.watch(cssSrc,['minify-css']);
	//gulp.watch('build/development/image/*',['images']);	
});

gulp.task('default',['html','sass','compress','minify-css','minify','webserver','watch']);