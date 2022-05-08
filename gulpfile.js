var gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber')

gulp.task('sass-compiler', e => {
	return gulp.src('./assets/sass/**/*.{scss, sass}')
		.pipe(
			sass.sync({
				comments: false,
				outputStyle: 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(gulp.dest('./assets/css/'))
})

gulp.task('app', e => {
	return gulp.src(['./assets/js/app/**/*.js'])
		.pipe(plumber())
		.pipe(babel({
			compact: false,
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js/'))
})

gulp.task('engine', e => {
	return gulp.src(['./assets/js/engine/**/*.js'])
		.pipe(plumber())
		.pipe(babel({
			compact: false,
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(concat('engine.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js/'))
})

gulp.task('plugins', e => {
	return gulp.src(['./assets/js/plugins/**/*.js'])
		.pipe(plumber())
		.pipe(babel({
			compact: false,
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(concat('plugins.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js/'))
})

gulp.task('gui', e => {
	return gulp.src(['./assets/js/gui/**/*.js'])
		.pipe(plumber())
		.pipe(babel({
			compact: false,
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(concat('gui.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js/'))
})

gulp.task('sass', e => {
	gulp.watch([
		'assets/sass/**/*.{scss, sass}'
	], gulp.parallel([ 
		'sass-compiler' 
	]))
})

gulp.task('js', e => {
	gulp.watch([
		'assets/js/**/*.js', 
		'!assets/js/apis/**/*.js'
	], gulp.parallel([ 
		'app', 
		'engine',
		'plugins',
		'gui' 
	]))
})