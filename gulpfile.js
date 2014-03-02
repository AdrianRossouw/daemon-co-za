var gulp         = require('gulp');
var gutil        = require('gulp-util');
var less         = require('gulp-less');
var livereload   = require('gulp-livereload');
var express      = require('express');
var _            = require('underscore');

var bowerSrc     = __dirname + '/bower_components';
var bootstrapSrc = bowerSrc + '/bootstrap';
var lesshatSrc   = bowerSrc + '/lesshat';

gulp.task('less', _.debounce(function() {
    // set up some paths for less to import from
    var paths = [];
    paths.push(__dirname + '/less');
    paths.push(bootstrapSrc + '/less');
    paths.push(lesshatSrc + '/build');

    gulp.src('less/*.less')
        .pipe(less({paths:paths}))
        .on('error', gutil.log)
        .pipe(gulp.dest('build/css'));

    gulp.src('less/*.css')
        .pipe(gulp.dest('build/css'));

}, 200));

gulp.task('bootstrap', _.debounce(function() {
    gulp.src(bootstrapSrc + '/fonts/**')
        .pipe(gulp.dest('build/fonts'));
}, 200));

gulp.task('jekyll', _.debounce(function(next) {
    return require('child_process').spawn('jekyll', ['build', '--config', '_config.yml,_test.yml'], {stdio: 'inherit'});
}, 400));

gulp.task('server', function(next) {
    var app = new express();
    //app.use(new express.logger());
    app.use(new express.static(__dirname + '/_site'));
    app.listen(4000, next);
    console.log("listening on port 4000");
});

gulp.task('copy-build', _.debounce(function() {
    gulp.src('build/css/**')
        .pipe(gulp.dest('_site/build/css'));
}, 200));

//gulp.task('default', ['less', 'jekyll']);

gulp.task('watch', ['less', 'bootstrap', 'jekyll', 'server'], function() {
    var server = livereload();
    gulp.watch('less/**', ['less']);
    gulp.watch('build/**', ['copy-build']);
    gulp.watch([
        'index.html',
        '_posts/**',
        '_includes/**',
        '_layouts/**',
        'portfolio/**',
    ], ['jekyll']);
    gulp.watch('_site/**').on('change', function(file) {
        server.changed(file.path);
    });
});
