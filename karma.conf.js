const webpack = require('webpack');

module.exports = function(config) {
  config.set({
    // other configurations
    files: [
      // specify your files here
    ],
    exclude: [
      'node_modules/**'
    ],
    preprocessors: {
      '**/*.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      node: {
        fs: 'empty'
      },
      plugins: [
        // Ignore Playwright's dependencies that can't be bundled
        new webpack.IgnorePlugin(/\.\/lib\/(fs|child_process)$/),
      ],
    },
    // other configurations
  });
};
