'use strict';

var htmlmin = require('gulp-htmlmin');
var stylus = require('gulp-stylus');
var gulp = require('gulp');

var paths = {
	dest: 'build',
	html: 'src/index.html',
	styles: {
		index: 'src/styles/index.styl',
		all: 'src/styles/**/*.styl'
	}
};

gulp.task('html', function() {
	gulp.src(paths.html)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('styles', function() {
	gulp.src(paths.styles.index)
		.pipe(stylus({ compress: true }))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.styles.all, ['styles']);
});

gulp.task('build', ['html', 'styles']);
gulp.task('default', ['build', 'watch']);
