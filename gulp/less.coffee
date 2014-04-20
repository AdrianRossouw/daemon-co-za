_            = require('underscore')
gulp         = require('gulp')
gutil        = require('gulp-util')
less         = require('gulp-less')

gulp.task "less", ->
  bowerSrc     = __dirname + "/../bower_components"

  # set up some paths for less to import from
  paths = [
    __dirname + "/../less"
    bowerSrc + "/bootstrap/less"
    bowerSrc + "/lesshat/build"
  ]

  gulp.src("less/*.less")
    .pipe(less(paths: paths))
    .on("error", gutil.log)
    .pipe gulp.dest("build/css")

  gulp.src("less/*.css")
    .pipe gulp.dest("build/css")
