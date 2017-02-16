var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var nodemon = require('gulp-nodemon');
var util = require('gulp-util');

gulp.task('default', ['run']);

gulp.task('run', ['build'], function () {
    nodemon({
        delay: 10,
        script: './server/server.js',
        cwd: "./bin/",
        ext: 'html js css'
    })
    .on('restart', function () {
        util.log('server restarted!');
    });
});

gulp.task('build', ['build-client', 'build-server']);

gulp.task('build-client', ['lint', 'move-client'], function () {
  return gulp.src(['src/client/main.js'])
    .pipe(uglify())
    .pipe(webpack())
    .pipe(gulp.dest('bin/client/'));
});

gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!node_modules/**/*.js', '!bin/**/*.js'])
    .pipe(jshint({
          esnext: true
      }))
    .pipe(jshint.reporter('default', { verbose: true}))
    .pipe(jshint.reporter('fail'));
});

gulp.task('move-client', function () {
  return gulp.src(['src/client/*.*', '!client/*.js'])
    .pipe(gulp.dest('./bin/client/'));
});

gulp.task('build-server', ['lint'], function () {
  return gulp.src(['src/server/**/*.*', 'src/server/**/*.js'])
    .pipe(gulp.dest('bin/server/'));
});