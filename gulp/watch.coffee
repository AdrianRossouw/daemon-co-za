gulp = require("gulp")
livereload = require('gulp-livereload')

server = null

gulp.task "watch", ["default"], ->
  server ?= livereload()

  gulp.watch "less/**", ["less"]
  gulp.watch "build/**", ["copy-build"]
  gulp.watch [
    "index.html"
    "_posts/**"
    "_includes/**"
    "_layouts/**"
    "portfolio/**"
  ], ["jekyll"]
  gulp.watch "_site/**", (file) ->
    server.changed file.path

