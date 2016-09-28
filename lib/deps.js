/**
 * babel-plugin-webpack-loaders used to transform js file into text
 * ?dontSkipJs is a hack used to skip js file check in webpack-loaders
 * as by default it doesn't transform js files
 */

export const regeneratorSource = require('regenerator/runtime/dev.js?dontSkipJs');
