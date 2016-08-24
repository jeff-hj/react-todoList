var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

gulp.task('build', function () {
  return gulp.src('app/jsx/*')
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(browserify())
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
})
gulp.task('watch', function () {
  gulp.watch(['app/jsx/*'], function () {
    gulp.run('build');
  })
})
gulp.task('server', function() {
  connect.server({
    root: 'app',
    port: 8080,
    livereload: true
  });
});