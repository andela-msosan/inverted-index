
const gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  spawn = require('child_process').spawn,
  webpack = require('webpack-stream'),
  fs = require('fs'),
  browserify = require('browserify'),
  connect = require('gulp-connect');

const paths = {
  jsFiles: ['./src/inverted-index.js'],
  htmlFiles: './public/*.html',
  cssFiles: 'public/css/*.css',
  scriptFiles: 'public/js/*.js',
  testFiles: 'jasmine/spec/inverted-index-test.js',
  specRunner: 'jasmine/specRunner.html'
};

// lint
gulp.task('lint', () => {
  gulp.src(paths.jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


// serve
gulp.task('serve', () => {
  const options = {
    root: './public',
    livereload: true,
    port: process.env.port || 3000
  };

  connect.server(options);
});

// watch
gulp.task('watch', () => {
  gulp.watch(paths.jsFiles, ['reloadServer']);
  gulp.watch(paths.htmlFiles, ['reloadServer']);
  gulp.watch(paths.cssFiles, ['reloadServer']);
  gulp.watch(paths.scriptFiles, ['reloadServer']);
});

// reload
gulp.task('reloadServer', () => {
  gulp.src(['./public/*.html', 'public/css/*.css', 'public/js/*.js', 'src/*.js'])
    .pipe(connect.reload());
});

// test
gulp.task('test', () => {
  spawn('node_modules/karma/bin/karma', ['start', '--single-run'], {
    stdio: 'inherit'
  }).on('close', process.exit);
});

gulp.task('testWatch', () => {
  gulp.watch(paths.testFiles, ['testReload']);
});

gulp.task('testReload', () => {
  gulp.src(paths.specRunner)
    .pipe(connect.reload());
});

gulp.task('webpack', () => {
  return gulp.src('jasmine/spec/inverted-index-test.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest(''));
});

gulp.task('babelify', () => {
  browserify('src/inverted-index.js')
  .transform('babelify', { presets: ['es2015'] })
  .bundle()
  .pipe(fs.createWriteStream('src/inverted-bundled.js'));
});

gulp.task('default', ['reloadServer', 'testWatch', 'testReload', 'serve', 'watch']);
