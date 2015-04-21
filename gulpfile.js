'use strict';

var htmlmin = require('gulp-htmlmin');
var gulp = require('gulp');

var paths = {
	dest: 'build',
	html: 'src/index.html'
};

gulp.task('html', function() {
	gulp.src(paths.html)
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
	gulp.watch(paths.html, ['html']);
});

gulp.task('build', ['html']);
gulp.task('default', ['build', 'watch']);
