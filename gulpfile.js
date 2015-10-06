/* eslint-env node, amd */

const gulp = require('gulp');
const rimraf = require('rimraf');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const argv = require('yargs').argv;
const request = require('request');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const babelify = require('babelify');
const browserify = require('browserify');
const watchify = require('watchify');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const merge = require('merge');
const runSequence = require('run-sequence');

const buildType = argv.release ? 'release' : 'debug';

gutil.log('buildType=' + buildType);
const entryPoint = './src/components/App.jsx';

const browserifyArgs = {
  entries: entryPoint,
  extensions: ['.jsx'],
  bundleExternal: true,
  detectGlobals: false,
  debug: buildType === 'debug' // generates inline sourcemaps
};

gulp.task('clean', function(callback) {
  rimraf('./build/' + buildType, callback);
});

gulp.task('copy', function() {
  gulp.src('./src/img/*').pipe(gulp.dest('build/' + buildType + '/img'));
  gulp.src('./src/*.html').pipe(gulp.dest('build/' + buildType));
});

gulp.task('sass', function() {
  // Build the main
  gulp.src('src/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/' + buildType));
});

gulp.task('build', function(callback) {
  runSequence('clean', ['sass', 'copy', 'browserify'], callback);
});

gulp.task('browserify', function() {
  const bundler = browserify(browserifyArgs)
    .transform(babelify, {/* options */ });

  return buildBundle(bundler);
});

// The watch task is only intended to run for debug
gulp.task('watch', function() {
  // Watch *.scss files for changes and rebuild
  // our main.css
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copy']);

  // Setup watchify/browserify
  const bundler = watchify(browserify(merge(browserifyArgs, watchify.args)))
    .transform(babelify, { /* opts */ });

  buildBundle(bundler, function(err) {
    if (err) return handleError(err);

    // Watch for changes to the build/debug directory and
    // trigger an autoreload
    watch(['build/debug/*'], function(event) {
      gutil.log('autoreload', event.path);
      request({
        url: 'http://localhost:3000/autoreload/notify',
        method: 'post',
        json: {
          files: [event.path]
        },
        strictSSL: false
      });
    });
  });

  bundler.on('update', function() {
    buildBundle(bundler, function(err) {
      if (err) return handleError(err);

      gutil.log('browserify bundle updated');
    });
  });
});

function buildBundle(bundler, callback) {
  return bundler.bundle()
    .on('error', callback || handleError)
    .pipe(source(entryPoint))
    .pipe(buffer())
    .pipe(rename(buildType === 'debug' ? 'bundle.js' : 'bundle.min.js'))
    .pipe(gulpif(buildType === 'release', uglify()))
    .pipe(gulp.dest('build/' + buildType))
    .on('end', function() {
      if (callback) {
        callback();
      }
    });
}

function handleError(err) {
  gutil.log('[ERROR] ', err.name, ': ', err.message.replace(new RegExp(__dirname, 'gi'), ''));
}
