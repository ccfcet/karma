var gulp = require('gulp')
var apidoc = require('gulp-apidoc')

gulp.task('doc', function (done) {
  apidoc({
    src: 'routes/',
    dest: 'apidoc/'
  }, done)
})
