# All the gulp tasks

require("./less")
require("./bootstrap")
require("./server")
require("./build")
require("./watch")
require("./jekyll")

gulp = require('gulp')

gulp.task('default', ['less', 'bootstrap', 'jekyll', 'build'])
