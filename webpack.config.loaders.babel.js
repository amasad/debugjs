/**
 * webpack config file for babel-plugin-webpack-loaders plugin
 * used to transform js files into string representation on import
 * see the lib/deps.js
*/

import path from 'path';

export default {
  output: {
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loaders: ['raw'],
        include: [
          path.join(__dirname, 'runtime'),
          path.join(__dirname, 'node_modules/regenerator/runtime'),
        ],
      },
    ],
  },
};
