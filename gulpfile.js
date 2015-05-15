var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var argv = require('yargs').argv;
// var htmlreplace = require('gulp-html-replace');
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
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

var liveReloading;
var buildType = argv.release ? 'release' : 'debug';

console.log("buildType=" + buildType);

var browserifyArgs = {
  entries: './src/components/App.jsx',
  // the babelify transform will automatically transform .jsx files
  transform: [babelify],
  debug: true, // generates inline sourcemaps
  cache: {}, packageCache: {}, fullPaths: false
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
    .pipe(gulp.dest('build/' + buildType))
    .pipe(gulpif(liveReloading==true, livereload()));
});

gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('build/' + buildType));
});

gulp.task('build', ['html', 'sass', 'browserify']);

gulp.task('browserify', function() {
  browserify(browserifyArgs)
    .bundle()
    .pipe(source(buildType === 'release' ? 'app.min.js' : 'app.js'))
    .pipe(gulp.dest('build/' + buildType));
});

// The watch task is only intended to run for debug
gulp.task('watch', function(cb) {
  // Watch the html file for changes
  // and run livereload
  watch('src/*.html')
    .pipe(gulp.dest('build/debug'))
    .pipe(livereload());

  // Watch *.scss files for changes and rebuild
  // our main.css
  gulp.watch('src/scss/*.scss', ['sass']);

  var watcher = watchify(browserify(browserifyArgs));

  var onUpdate = function() {
    watcher
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('build/debug'))
      .pipe(livereload());

      console.log('browserify bundle updated');
  };

  // Recreate the browserify bundle whenever watchify detects changes.
  // watchify is smart enough to do incremental updates based on only
  // what has changed to speed things up.
  watcher
    .on('update', onUpdate)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/debug'));

  // Start the livereload server
  liveReloading = true;
  livereload.listen({liveCSS: true}, cb);
});
