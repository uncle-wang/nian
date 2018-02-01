var gulp = require('gulp');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var jsSrc = './src/js/main.js';
var jsDst = './build/js/';
var lessSrc = './src/less/main.less';
var cssDst = './build/css/';

// 编译less文件
gulp.task('compileLess', function() {

	gulp
		.src(lessSrc)
		.pipe(less())
		.pipe(cleancss())
		.pipe(gulp.dest(cssDst));
});

// 监测less文件变化
gulp.task('watchless', function() {

	gulp.watch(lessSrc, ['compileLess']);
});

// 压缩js文件
gulp.task('uglifyJs', function() {

	gulp
		.src(jsSrc)
		.pipe(uglify())
		.pipe(gulp.dest(jsDst));
});

// 监测js文件变化
gulp.task('watchjs', function() {

	gulp.watch(jsSrc, ['uglifyJs']);
});

gulp.task('watch', ['watchless', 'watchjs']);
gulp.task('default', ['uglifyJs', 'compileLess']);