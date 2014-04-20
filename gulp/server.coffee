gulp = require('gulp')
express = require('express')

gulp.task "server", ["watch"], (next) ->
  app = new express()
  
  #app.use(new express.logger());
  app.use new express.static(__dirname + "/../_site")
  app.listen 4000, next
  console.log "listening on port 4000"
  return
