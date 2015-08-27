var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var argv = require('yargs').argv;
var request = require('request');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var babelify = require('babelify');
var browserify = require('browserify');
var uglifyify = require('uglifyify');
var watchify = require('watchify');
var sass = require('gulp-sass');
var streamify = require('gulp-streamify');
var gulpif = require('gulp-if');
var gutil = require('gutil');

var buildType = argv.release ? 'release' : 'debug';

gutil.log("buildType=" + buildType);

var browserifyArgs = {
  entries: './src/components/App.jsx',
  // the babelify transform will automatically transform .jsx files
  transform: [babelify],
  debug: true, // generates inline sourcemaps
  cache: {},
  packageCache: {},
  fullPaths: false
};

// Uglify the browserify bundle for release builds
if (buildType === 'release')
  browserifyArgs.transform.push('uglifyify');

gulp.task('sass', function() {
  // Build the main
  gulp.src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/' + buildType));
});

gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('build/' + buildType));
});

gulp.task('build', ['html', 'sass', 'browserify']);

gulp.task('browserify', function() {
  browserify(browserifyArgs)
    .bundle()
    .pipe(source(buildType === 'release' ? 'bundle.min.js' : 'bundle.js'))
    .pipe(gulp.dest('build/' + buildType));
});

// The watch task is only intended to run for debug
gulp.task('watch', function(cb) {
  // Watch for changes to the build/debug directory and
  // trigger an autoreload
  watch(["build/debug/*"], function(event) {
    gutil.log('autoreload', event.path);
    request({
      url: 'https://localhost:3000/autoreload/notify',
      method: 'post',
      json: {
        files: [event.path]
      },
      strictSSL: false
    });
  });

  // Watch *.scss files for changes and rebuild
  // our main.css
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/*.html', ['html']);

  var watcher = watchify(browserify(browserifyArgs));

  var onUpdate = function() {
    gutil.log('browserify bundle updated');

    watcher
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('build/debug'));
  };

  // Recreate the browserify bundle whenever watchify detects changes.
  // watchify is smart enough to do incremental updates based on only
  // what has changed to speed things up.
  watcher
    .on('update', onUpdate)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/debug'));
});
