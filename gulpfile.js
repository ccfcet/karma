var gulp = require('gulp');
var apidoc = require('gulp-apidoc');
var open = require('gulp-open');
var mocha = require('gulp-mocha');
// var constant = require('./constant');
var foreach = require('gulp-foreach');
var debug = require('debug')('gulp');
var replace = require('gulp-replace-task');

gulp.task('default', []);

gulp.task('doc',['replace', 'doc1']);

gulp.task('doc1', function(done) {
    apidoc({
        src: 'routes/',
        dest: 'apidoc/',
    }, done);
});

gulp.task('test', done => {
    gulp.src(['test/*.js', '!test/testData.js'])
        .pipe(mocha());
});

gulp.task('replace', done => {
    gulp.src(['routes/**/*.js'])
        .pipe(foreach(function(stream, file) {
            return stream
                .pipe(replace({
                    patterns: [{
                        match: /#constant\.(.*)#/g,
                        replacement: function(match, p1){
                        	return JSON.stringify(constant[p1]);
                        }
                    }]
                }))
                .pipe(gulp.dest(file.base))
        }))
});

