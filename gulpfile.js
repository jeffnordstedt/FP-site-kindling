var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var concat 			= require('gulp-concat');
var autoprefixer 	= require('gulp-autoprefixer');
var minifyCSS 		= require('gulp-minify-css');
var minifyCSS 		= require('gulp-minify-css');
var rename 			= require("gulp-rename");
var browserSync 	= require('browser-sync');

var paths = {
	'bower'		: './bower_components',
	'assets'	: './assets',
	'public'	: './public'
};






gulp.task('styles', function() {
	return gulp.src([
		paths.assets + '/styles/app.scss'
	])
	.pipe(sass({
		includePaths: [
			paths.bower + '/foundation/scss'
		]
	}))
	.pipe(autoprefixer())
	.pipe(concat('app.css'))
	.pipe(gulp.dest('./public/css'))
	.pipe(browserSync.reload({stream:true}))
	.on('error', function (error) {
		console.error('' + error);
	});
});

gulp.task('scripts', function() {
	gulp.src([
		paths.bower + '/jquery/dist/jquery.js',
		paths.bower + '/foundation/js/foundation.js',
		paths.bower + '/foundation/js/foundation/foundation.alert.js',
		paths.assets + '/scripts/app.js'
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./public/js'));

	return gulp.src(paths.bower + '/modernizr/modernizr.js')
		.pipe(gulp.dest('./public/js'));
});


gulp.task('watch', function() {
	gulp.watch(paths.assets + '/styles/**/*.scss', ['styles']);
	gulp.watch(paths.assets + '/scripts/**/*.js', ['scripts']);
	gulp.watch(paths.public + '/**/*.html').on("change", browserSync.reload);

})

gulp.task('default', ['watch']);


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "public"
		}
	});
});

gulp.task('start', ['browser-sync', 'watch']);