var browserSync = require('browser-sync');
var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var reactify = require('reactify');

gulp.task('live-server',function(){
	var server = new LiveServer('server/main.js');
	server.start();
});

gulp.task('bundle',function(){
	return browserify({
		entries:'app/main.jsx',
//		entries:'app/components/GroceryListApp.jsx',
		debug:true,
	})
	.transform(babelify)
	.transform(reactify)
	.transform(babelify.configure({
		stage:0,
		sourceMaps:true
	}))
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./.tmp'));
});

gulp.task('temp',function(){
	gulp.src(['app/index.html','app/*.css'])
		.pipe(gulp.dest('./.tmp'));

	gulp.src(['bower_components/**'])
		.pipe(gulp.dest('./.tmp/bower_components'));
});

gulp.task('bundle-n-reload',['bundle'],browserSync.reload)

gulp.task('observe-all',function(){
	gulp.watch('app/**/*.*',['bundle-n-reload']);
	gulp.watch('app/*.*',['temp']);
	gulp.watch('./server/**/*.js',['live-server']);
});


gulp.task('serve', ['live-server','bundle','temp','observe-all'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:7777",
		port: 9003
	});
});
