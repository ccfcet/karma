const gulp = require('gulp');
const apidoc = require('gulp-apidoc');

gulp.task('doc', (done) => {
  apidoc({
    src: 'routes/',
    dest: 'apidoc/',
    config: '.',
  }, done);
});
