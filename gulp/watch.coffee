gulp = require("gulp")
watch = require("gulp-watch")
livereload = require('gulp-livereload')

server = null

gulp.task "watch", ["default"], ->
  server ?= livereload()

  gulp.watch "less/**", ["less"]
  gulp.watch "build/**", ["build"]
  gulp.watch [
    "index.html"
    "_posts/**"
    "_includes/**"
    "_layouts/**"
    "portfolio/**"
  ], ["jekyll"]

  #  watch glob: "_site/**", (files) ->
  #  console.log(files)
  #server.changed file.path for file in files

