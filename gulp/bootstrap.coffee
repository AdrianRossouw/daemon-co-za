gulp = require("gulp")

gulp.task "bootstrap", ->
  bowerSrc = __dirname + "/../bower_components"
  bootstrapSrc = bowerSrc + "/bootstrap"

  gulp.src(bootstrapSrc + "/fonts/**")
    .pipe gulp.dest("build/fonts")

  gulp.src(bowerSrc + "/jquery/dist/**")
    .pipe gulp.dest("build/js")

  gulp.src(bootstrapSrc + "/js/**")
    .pipe gulp.dest("build/js")
