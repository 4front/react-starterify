var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
// var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var sass = require('gulp-sass');
var streamify = require('gulp-streamify');
var gulpif = require('gulp-if');
var livereload = require('gulp-livereload');

var buildType, liveReloading;

gulp.task('sass', function() {
  // Build the main
  gulp.src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/debug'))
    .pipe(gulpif(liveReloading==true, livereload()));
});

gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('build/debug'));
});

gulp.task('setDebugBuild', function() {
  buildType = 'debug';
});

gulp.task('debugBuild', ['setDebugBuild', 'html', 'sass']);

gulp.task('watch', ['debugBuild', 'setWatchers']);

gulp.task('setWatchers', function(cb) {
  // Copy the index.html file to
  // gulp.src('src/*.html')
  //   .pipe(gulp.dest('build/debug'));

  // Watch the html file for changes
  // and run livereload
  watch('src/*.html')
    .pipe(gulp.dest('build/debug'))
    .pipe(livereload());

  // Watch *.scss files for changes and rebuild
  // our main.css
  gulp.watch('src/scss/*.scss', ['sass']);

  var watcher  = watchify(browserify({
    entries: './src/components/App.jsx',
    transform: [reactify],
    debug: true, // generates inline sourcemaps
    cache: {}, packageCache: {}, fullPaths: true
  }));

  var onUpdate = function() {
    watcher.bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('build/debug'))
      .pipe(livereload());

      console.log('browserify bundle updated');
  };

  // The watcher creates the bundle when the watch task is first called and again whenever
  // a change is made.
  watcher
    .on('update', onUpdate)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/debug'));

  // Start the livereload server
  liveReloading = true;
  livereload.listen({liveCSS: true}, cb);
});
