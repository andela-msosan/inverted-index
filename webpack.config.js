module.exports = {
  entry: './jasmine/spec/inverted-index-test.js',
  output: {
    filename: 'jasmine/spec/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js6$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6']
  },
  watch: true
};
