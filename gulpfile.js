'use strict';

var plumber = require('gulp-plumber');
var htmlmin = require('gulp-htmlmin');
var stylus = require('gulp-stylus');
var small = require('small').gulp;
var react = require('gulp-react');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell');
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
	},
	tests: {
		all: 'test/**/*.test.js'
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
		.pipe(plumber())
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

gulp.task('test', function() {
	gulp.src(paths.tests.all, { read: false })
		.pipe(mocha());
});

gulp.task('lint', shell.task([
	'node_modules/.bin/jsxhint gulpfile.js "{src,test}/**/*.js"'
], { ignoreErrors: true }));

gulp.task('watch', function() {
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.styles.all, ['styles']);
	gulp.watch(paths.js.all, ['js', 'lint']);
	gulp.watch(paths.thirdpartyJs.all, ['thirdparty-js']);
});

gulp.task('build', ['html', 'styles', 'js', 'thirdparty-js', 'lint']);
gulp.task('default', ['build', 'watch']);
