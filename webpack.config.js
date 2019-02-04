const path = require('path');
const webpack = require('webpack');

module.exports = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      carousel: './src/carousel.js',
      example: './examples/simpleExample/example',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].min.js',
      library: 'Accessible Carousel',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
