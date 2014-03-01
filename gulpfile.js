var gulp       = require('gulp');
var gutil      = require('gulp-util');
var less       = require('gulp-less');
var livereload = require('gulp-livereload');
var express    = require('express');
var _          = require('underscore');

var bootstrapSrc = __dirname + '/bower_components/bootstrap';
gulp.task('less', _.debounce(function() {
    var opts = {
        paths: [bootstrapSrc + '/less']
    };
    gulp.src('less/*.less')
        .pipe(less(opts))
        .on('error', gutil.log)
        .pipe(gulp.dest('build/css'));

    gulp.src('less/*.css')
        .pipe(gulp.dest('build/css'));

}, 200));

gulp.task('bootstrap', _.debounce(function() {
    gulp.src(bootstrapSrc + '/fonts/**')
        .pipe(gulp.dest('build/fonts'));
}, 200));

gulp.task('jekyll', _.debounce(function() {
    require('child_process').spawn('jekyll', ['build', '--config', '_config.yml,_test.yml'], {stdio: 'inherit'});
}, 400));

gulp.task('server', function(next) {
    var app = new express();
    app.use(new express.logger());
    app.use(new express.static(__dirname + '/_site'));
    app.listen(4000, next);
    console.log("listening on port 4000");
});

//gulp.task('default', ['less', 'jekyll']);

gulp.task('watch', ['less', 'bootstrap', 'jekyll', 'server'], function() {
    var server = livereload();
    gulp.watch('less/**', ['less']);
    gulp.watch([
        'index.html',
        '_posts/**',
        '_includes/**',
        '_layouts/**',
        'portfolio/**',
        'build/**'
    ], ['jekyll']);
    gulp.watch('_site/**').on('change', _.debounce(function(file) {
        server.changed(file.path);
    }, 200));
});
