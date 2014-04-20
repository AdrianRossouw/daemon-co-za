child_process = require('child_process')
gulp          = require('gulp')

gulp.task "jekyll", (next) ->
  opts = [
    "build"
    "--config"
    "_config.yml,_test.yml"
  ]
  require("child_process").spawn("jekyll", opts, stdio: "inherit")
    .on('close', -> next() )
    .on('error', (err) -> next(err) )

