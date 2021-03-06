// Karma configuration
// Generated on Sat Nov 19 2016 16:51:59 GMT+0100 (WAT)

module.exports = function (config) {
  const configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/inverted-index.js',
      'jasmine/spec/inverted-index-test.js'
    ],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

    // plugins: ['karma-coverage', 'karma-coveralls',
    //   'karma-babel-preprocessor', 'karma-chrome-launcher',
    //   'karma-jasmine'],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/inverted-index.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'coveralls'],


    // web server port
    port: 9878,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : ['Chrome'],
    // Custom launchers for travis.
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  // if (process.env.TRAVIS) {
  //   configuration.browsers = ['Chrome_travis_ci'];
  // }

  config.set(configuration);
};
