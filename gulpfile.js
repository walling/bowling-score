'use strict';

var htmlmin = require('gulp-htmlmin');
var stylus = require('gulp-stylus');
var small = require('small').gulp;
var react = require('gulp-react');
var wrap = require('gulp-wrap');
var gulp = require('gulp');

var paths = {
	dest: 'build',
	html: 'src/index.html',
	styles: {
		index: 'src/styles/index.styl',
		all: 'src/styles/**/*.styl'
	},
	js: {
		all: 'src/js/**/*.js'
	},
	thirdpartyJs: {
		all: 'thirdparty/js/*.js'
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

gulp.task('js', function() {
	gulp.src(paths.js.all)
		.pipe(react())
		.pipe(small('index.js', {
			globalModules: {
				react: {
					standalone: 'window.React'
				}
			},
			outputFileName: {
				standalone: 'index.js'
			}
		}))
		.pipe(wrap('(function(){ "use strict"; window.app = <%= contents %>; }());'))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('thirdparty-js', function() {
	gulp.src(paths.thirdpartyJs.all)
		.pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.styles.all, ['styles']);
	gulp.watch(paths.js.all, ['js']);
	gulp.watch(paths.thirdpartyJs.all, ['thirdparty-js']);
});

gulp.task('build', ['html', 'styles', 'js', 'thirdparty-js']);
gulp.task('default', ['build', 'watch']);