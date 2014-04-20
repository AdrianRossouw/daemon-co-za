gulp = require('gulp')

gulp.task "build", ->
  gulp.src("build/css/**")
    .pipe gulp.dest("_site/build/css")
